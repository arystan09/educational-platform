import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Course } from '../courses/entites/course.entity';
import { CourseProgress } from './entities/course_progress.entity';
import { CertificateService } from '../certificates/certificate.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,

    @InjectRepository(Chapter)
    private readonly chapterRepo: Repository<Chapter>,

    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,

    @InjectRepository(CourseProgress)
    private readonly courseProgressRepo: Repository<CourseProgress>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly certificateService: CertificateService,
  ) {}

  async markComplete(userId: string, chapterId: string) {
    const chapter = await this.chapterRepo.findOne({
      where: { id: chapterId },
      relations: ['course'],
    });
    if (!chapter) throw new NotFoundException('Глава не найдена');

    const exists = await this.progressRepo.findOne({
      where: {
        user: { id: userId },
        chapter: { id: chapterId },
      },
    });
    if (exists) return exists;

    const progress = this.progressRepo.create({
      user: { id: userId } as User,
      chapter: { id: chapterId } as Chapter,
    });

    return this.progressRepo.save(progress);
  }

  async getCompletedChapters(userId: string, courseId: string) {
    return this.progressRepo.find({
      where: {
        user: { id: userId },
        chapter: { course: { id: courseId } },
      },
      relations: ['chapter'],
    });
  }

  async getProgressPercent(userId: string, courseId: string) {
    const completed = await this.progressRepo.count({
      where: {
        user: { id: userId },
        chapter: { course: { id: courseId } },
      },
      relations: ['chapter'],
    });

    const total = await this.chapterRepo.count({
      where: { course: { id: courseId } },
    });

    const percent = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, percent: Math.round(percent) };
  }

  async markChapterCompleted(
    userId: string,
    courseId: string,
    chapterId: string,
  ) {
    let progress = await this.courseProgressRepo.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!progress) {
      progress = this.courseProgressRepo.create({
        user: { id: userId } as User,
        course: { id: courseId } as Course,
        completedChapters: {},
      });
    }

    progress.completedChapters[chapterId] = true;

    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      relations: ['chapters'],
    });
    if (!course) throw new NotFoundException('Курс не найден');

    const allCompleted = course.chapters.every(
      (ch) => progress.completedChapters[ch.id],
    );

    progress.isCompleted = allCompleted;

    if (allCompleted && !progress.certificateUrl) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('Пользователь не найден');

      const certificateUrl = await this.certificateService.generate(
        user,
        course,
      );
      progress.certificateUrl = certificateUrl;
    }

    return this.courseProgressRepo.save(progress);
  }

  async getCertificate(userId: string, courseId: string) {
    const progress = await this.courseProgressRepo.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!progress || !progress.isCompleted) {
      throw new ForbiddenException('Курс ещё не завершён');
    }

    return { certificateUrl: progress.certificateUrl };
  }
}
