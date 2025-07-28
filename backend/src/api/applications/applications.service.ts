import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from '../applications/entities/application.entity';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
import { ApplicationStatus } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private appRepo: Repository<Application>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async apply(userId: string, courseId: string) {
    const course = await this.courseRepo.findOneBy({ id: courseId });
    if (!course) throw new NotFoundException('Курс не найден');

    const existing = await this.appRepo.findOne({ where: { user: { id: userId }, course } });
    if (existing) throw new ConflictException('Заявка уже отправлена');

    const application = this.appRepo.create({
      user: { id: userId } as User,
      course,
    });

    return this.appRepo.save(application);
  }

  async getUserApplications(userId: string) {
    return this.appRepo.find({ where: { user: { id: userId } } });
  }

  async getAllApplications() {
    return this.appRepo.find();
  }

  async changeStatus(id: string, status: ApplicationStatus) {
    const app = await this.appRepo.findOneBy({ id });
    if (!app) throw new NotFoundException('Заявка не найдена');

    app.status = status;
    return this.appRepo.save(app);
  }
}
