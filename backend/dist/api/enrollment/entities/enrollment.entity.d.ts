import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';
export declare class Enrollment {
    id: string;
    user: User;
    course: Course;
    createdAt: Date;
    completed: boolean;
}
