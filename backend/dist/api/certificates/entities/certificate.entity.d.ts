import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';
export declare class Certificate {
    id: string;
    user: User;
    course: Course;
    issuedAt: Date;
}
