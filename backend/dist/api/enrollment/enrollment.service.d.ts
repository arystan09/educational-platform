import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
export declare class EnrollmentService {
    private readonly enrollmentRepository;
    constructor(enrollmentRepository: Repository<Enrollment>);
    countAll(): Promise<number>;
    findAll(): Promise<Enrollment[]>;
    approve(id: string): Promise<Enrollment>;
    reject(id: string): Promise<Enrollment>;
    enroll(userId: string, courseId: string): Promise<Enrollment>;
    getUserEnrollments(userId: string): Promise<Enrollment[]>;
    checkUserAccess(userId: string, courseId: string): Promise<boolean>;
}
