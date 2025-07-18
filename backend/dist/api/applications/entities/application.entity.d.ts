import { User } from '../../users/user.entity';
import { Course } from '../../courses/course.entity';
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
