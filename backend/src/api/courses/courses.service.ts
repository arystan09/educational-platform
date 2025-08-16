import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entites/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepository.find({
      relations: ['createdBy', 'enrollments', 'enrollments.user'],
    });
  }

  async findPublished() {
    return this.courseRepository.find({
      where: { isPublished: true },
      relations: ['createdBy', 'enrollments', 'enrollments.user'],
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['createdBy', 'enrollments', 'enrollments.user'],
    });
    if (!course) throw new NotFoundException('Курс не найден');
    return course;
  }

  async create(dto: CreateCourseDto, creator: User) {
    const course = this.courseRepository.create({
      ...dto,
      createdBy: creator,
    });
    return this.courseRepository.save(course);
  }

  async update(id: string, dto: UpdateCourseDto, user: User) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!course) throw new NotFoundException('Курс не найден');

    if (course.createdBy?.id !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Недостаточно прав для редактирования');
    }

    Object.assign(course, dto);
    return this.courseRepository.save(course);
  }

  async delete(id: string, user: User): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    if (course.createdBy?.id !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Недостаточно прав для удаления');
    }

    await this.courseRepository.remove(course);
  }

  async publish(id: string, user: User): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    if (course.createdBy?.id !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Недостаточно прав для публикации');
    }

    course.isPublished = true;
    return this.courseRepository.save(course);
  }
}
