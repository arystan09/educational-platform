import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { Certificate } from './entities/certificate.entity';
export declare class CertificateService {
    private certificateRepository;
    private certsDir;
    constructor(certificateRepository: Repository<Certificate>);
    getUserCertificates(userId: string): Promise<Certificate[]>;
    generate(user: User, course: Course): Promise<string>;
    findAll(): string[];
    remove(fileName: string): string;
}
