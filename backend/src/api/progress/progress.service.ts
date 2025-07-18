import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
    @InjectRepository(Chapter)
    private readonly chapterRepo: Repository<Chapter>,
  ) {}

  async markComplete(userId: number, chapterId: number) {
    const chapter = await this.chapterRepo.findOne({
      where: { id: chapterId },
      relations: ['course'],
    });
    if (!chapter) throw new NotFoundException('Глава не найдена');

    // уже завершена?
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

  async getCompletedChapters(userId: number, courseId: number) {
    return this.progressRepo.find({
      where: {
        user: { id: userId },
        chapter: { course: { id: courseId } },
      },
      relations: ['chapter'],
    });
  }

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
}
