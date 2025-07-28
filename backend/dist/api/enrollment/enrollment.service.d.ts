import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
export declare class EnrollmentService {
    private readonly enrollmentRepository;
    constructor(enrollmentRepository: Repository<Enrollment>);
    countAll(): Promise<number>;
    findAll(): Promise<Enrollment[]>;
    approve(id: string): Promise<Enrollment>;
    reject(id: string): Promise<Enrollment>;
}
