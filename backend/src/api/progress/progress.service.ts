import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Course } from '../courses/entites/course.entity';
import { CourseProgress } from './entities/course_progress.entity';

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
  ) {}

  // ✅ Стандартная отметка главы завершённой (по текущей архитектуре)
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

  // ⚠️ Альтернативный подход — ведение прогресса по курсу в одной записи (можно не использовать сейчас)
  async markChapterCompleted(userId: number, courseId: number, chapterId: number) {
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
      ch => progress.completedChapters[ch.id],
    );

    progress.isCompleted = allCompleted;

    return this.courseProgressRepo.save(progress);
  }
}
