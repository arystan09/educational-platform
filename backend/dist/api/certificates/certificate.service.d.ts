import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
export declare class CertificateService {
    private certsDir;
    generate(user: User, course: Course): Promise<string>;
    findAll(): string[];
    remove(fileName: string): string;
}
