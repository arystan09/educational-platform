import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Course } from '../courses/entites/course.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepo: Repository<Chapter>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
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
}
