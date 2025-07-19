import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
export declare class CertificateService {
    generate(user: User, course: Course): Promise<string>;
}
