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

  // ✅ Стандартная отметка главы завершённой
  async markComplete(userId: number, chapterId: number) {
    const chapter = await this.chapterRepo.findOne({
      where: { id: chapterId },
      relations: ['course'],
    });
    if (!chapter) throw new NotFoundException('Глава не найдена');

    const exists = await this.progressRepo.findOne({
      where: { user: { id: userId }, chapter: { id: chapterId } },
    });
    if (exists) return exists;

    const progress = this.progressRepo.create({
      user: { id: userId },
      chapter,
    });

    return this.progressRepo.save(progress);
  }

  // ✅ Получить все завершённые главы по курсу
  async getCompletedChapters(userId: number, courseId: number) {
    return this.progressRepo.find({
      where: {
        user: { id: userId },
        chapter: { course: { id: courseId } },
      },
      relations: ['chapter'],
    });
  }

  // ✅ Получить % прогресса по курсу
  async getProgressPercent(userId: number, courseId: number) {
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

  // ✅ Альтернативный подход + генерация сертификата
  async markChapterCompleted(
    userId: number,
    courseId: number,
    chapterId: number,
  ) {
    let progress = await this.courseProgressRepo.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (!progress) {
      progress = this.courseProgressRepo.create({
        user: { id: userId },
        course: { id: courseId },
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

    // ✅ Генерация сертификата
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

  // ✅ Получить сертификат, если курс завершён
  async getCertificate(userId: number, courseId: number) {
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
