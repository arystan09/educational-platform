import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';
import { EnrollmentStatus } from '../enums/enrollment-status.enum';
export declare class Enrollment {
    id: string;
    user: User;
    course: Course;
    createdAt: Date;
    completed: boolean;
    status: EnrollmentStatus;
}
