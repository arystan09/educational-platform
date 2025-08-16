import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { EnrollmentStatus } from './enums/enrollment-status.enum';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  async countAll(): Promise<number> {
    return this.enrollmentRepository.count();
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      relations: ['user', 'course'],
    });
  }

  async approve(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOneBy({ id });
    if (!enrollment) throw new NotFoundException('Enrollment not found');

    enrollment.status = EnrollmentStatus.APPROVED;
    return this.enrollmentRepository.save(enrollment);
  }

  async reject(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOneBy({ id });
    if (!enrollment) throw new NotFoundException('Enrollment not found');

    enrollment.status = EnrollmentStatus.REJECTED;
    return this.enrollmentRepository.save(enrollment);
  }

  async enroll(userId: string, courseId: string): Promise<Enrollment> {
    console.log('🔍 Enrolling user', userId, 'in course', courseId);
    
    try {
      // Check if enrollment already exists
      const existingEnrollment = await this.enrollmentRepository.findOne({
        where: { user: { id: userId }, course: { id: courseId } },
      });

      if (existingEnrollment) {
        console.log('⚠️ User already enrolled in this course');
        return existingEnrollment;
      }

      // For now, allow self-enrollment but with PENDING status
      // This can be changed to throw ForbiddenException to completely disable self-enrollment
      const enrollment = this.enrollmentRepository.create({
        user: { id: userId },
        course: { id: courseId },
        status: EnrollmentStatus.PENDING, // Require admin approval
      });

      console.log('💾 Saving enrollment:', enrollment);
      const savedEnrollment = await this.enrollmentRepository.save(enrollment);
      console.log('✅ Enrollment saved successfully:', savedEnrollment);
      return savedEnrollment;
    } catch (error) {
      console.error('❌ Enrollment error:', error);
      throw error;
    }
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async checkUserAccess(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { 
        user: { id: userId }, 
        course: { id: courseId },
        status: EnrollmentStatus.APPROVED 
      },
    });
    return !!enrollment;
  }
}
