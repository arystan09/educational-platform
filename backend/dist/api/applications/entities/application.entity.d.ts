import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';
export declare enum ApplicationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class Application {
    id: number;
    user: User;
    course: Course;
    status: ApplicationStatus;
    createdAt: Date;
}
