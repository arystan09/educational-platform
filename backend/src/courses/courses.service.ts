import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepo.find({ where: { isPublished: true } });
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Курс не найден');
    return course;
  }

  async create(dto: CreateCourseDto, creator: User) {
    const course = this.courseRepo.create({ ...dto, createdBy: creator });
    return this.courseRepo.save(course);
  }

  async update(id: number, dto: CreateCourseDto, user: User) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException('Курс не найден');
    if (course.createdBy.id !== user.id && user.role !== 'ADMIN') {
      throw new Error('Недостаточно прав');
    }
    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }
}
