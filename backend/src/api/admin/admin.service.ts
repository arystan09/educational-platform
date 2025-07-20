import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { GrantCourseAccessDto } from './dto/grant-course-access.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async getAllUsers() {
    return this.userRepo.find({ relations: ['enrollments'] });
  }

  async updateUserRole(id: string, dto: UpdateUserRoleDto) {
    const user = await this.userRepo.findOne({ where: { id: Number(id) } });
    if (!user) throw new NotFoundException('User not found');
    user.role = dto.role;
    return this.userRepo.save(user);
  }

  async grantCourseAccess(dto: GrantCourseAccessDto) {
    const user = await this.userRepo.findOne({ where: { id: Number(dto.userId) }, relations: ['enrollments'] });
    const course = await this.courseRepo.findOne({ where: { id: Number(dto.courseId) } });

    if (!user || !course) throw new NotFoundException('User or Course not found');

    user.enrollments.push({ user, course, startedAt: new Date() } as any); // TODO: заменить на реальную сущность
    return this.userRepo.save(user);
  }
}
