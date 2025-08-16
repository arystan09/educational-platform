import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { GrantCourseAccessDto } from './dto/grant-course-access.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { EnrollmentStatus } from '../enrollment/enums/enrollment-status.enum';
import { Role } from '../users/enums/role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async getAllUsers() {
    return this.userRepo.find({ 
      relations: ['enrollments', 'enrollments.course'],
      where: { role: Role.STUDENT }
    });
  }

  async updateUserRole(id: string, dto: UpdateUserRoleDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.role = dto.role;
    return this.userRepo.save(user);
  }

  async grantCourseAccess(dto: GrantCourseAccessDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });

    if (!user) throw new NotFoundException('User not found');
    if (!course) throw new NotFoundException('Course not found');

    // Check if enrollment already exists
    const existingEnrollment = await this.enrollmentRepo.findOne({
      where: { user: { id: dto.userId }, course: { id: dto.courseId } }
    });

    if (existingEnrollment) {
      // Update existing enrollment to approved
      existingEnrollment.status = EnrollmentStatus.APPROVED;
      return this.enrollmentRepo.save(existingEnrollment);
    }

    // Create new enrollment
    const enrollment = this.enrollmentRepo.create({
      user,
      course,
      status: EnrollmentStatus.APPROVED,
    });

    return this.enrollmentRepo.save(enrollment);
  }

  async revokeCourseAccess(userId: string, courseId: string) {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { user: { id: userId }, course: { id: courseId } }
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.enrollmentRepo.remove(enrollment);
    return { message: 'Course access revoked successfully' };
  }

  async getUserEnrollments(userId: string) {
    const enrollments = await this.enrollmentRepo.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
    return enrollments;
  }

  async getAllEnrollments() {
    return this.enrollmentRepo.find({
      relations: ['user', 'course'],
    });
  }
}
