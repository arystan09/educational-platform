import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { ChapterProgress } from './chapter-progress.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepo: Repository<Chapter>,
    @InjectRepository(ChapterProgress)
    private progressRepo: Repository<ChapterProgress>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByCourse(courseId: string) {
    return this.chapterRepo.find({
      where: { course: { id: courseId } },
      order: { order: 'ASC' },
    });
  }

  async create(dto: CreateChapterDto) {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Курс не найден');

    const chapter = this.chapterRepo.create({ ...dto, course });
    return this.chapterRepo.save(chapter);
  }

  async update(id: string, dto: CreateChapterDto) {
    const chapter = await this.chapterRepo.findOne({ where: { id } });
    if (!chapter) throw new NotFoundException('Глава не найдена');

    Object.assign(chapter, dto);
    return this.chapterRepo.save(chapter);
  }

  async delete(id: string) {
    const result = await this.chapterRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Глава не найдена');
    return { message: 'Удалено' };
  }

  async markComplete(chapterId: string, userId: string) {
    console.log('🔍 markComplete called with:', { chapterId, userId });
    
    const chapter = await this.chapterRepo.findOne({ where: { id: chapterId } });
    if (!chapter) throw new NotFoundException('Глава не найдена');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    console.log('✅ Found user:', user.id);

    // Check if progress already exists
    let progress = await this.progressRepo.findOne({
      where: { chapterId: parseInt(chapterId), userId }
    });

    if (progress) {
      // Update existing progress
      progress.completed = true;
      progress.completedAt = new Date();
      await this.progressRepo.save(progress);
    } else {
      // Create new progress
      progress = this.progressRepo.create({
        chapterId: parseInt(chapterId),
        userId,
        completed: true,
        completedAt: new Date()
      });
      await this.progressRepo.save(progress);
    }
    
    return { 
      message: 'Глава отмечена как завершенная',
      chapterId,
      userId,
      completed: true
    };
  }

  async getChapterProgress(chapterId: string, userId: string) {
    const progress = await this.progressRepo.findOne({
      where: { chapterId: parseInt(chapterId), userId }
    });
    
    return progress ? { completed: progress.completed, completedAt: progress.completedAt } : { completed: false };
  }

  async unmarkComplete(chapterId: string, userId: string) {
    console.log('🔍 unmarkComplete called with:', { chapterId, userId });
    
    const chapter = await this.chapterRepo.findOne({ where: { id: chapterId } });
    if (!chapter) throw new NotFoundException('Глава не найдена');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    console.log('✅ Found user:', user.id);

    // Check if progress exists
    const progress = await this.progressRepo.findOne({
      where: { chapterId: parseInt(chapterId), userId }
    });

    if (progress) {
      // Update existing progress to mark as not completed
      progress.completed = false;
      progress.completedAt = null as any;
      await this.progressRepo.save(progress);
    }
    
    return { 
      message: 'Глава отмечена как незавершенная',
      chapterId,
      userId,
      completed: false
    };
  }
}
