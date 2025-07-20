import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';

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
}
