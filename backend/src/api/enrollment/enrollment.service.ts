import { Injectable, NotFoundException } from '@nestjs/common';
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
}
