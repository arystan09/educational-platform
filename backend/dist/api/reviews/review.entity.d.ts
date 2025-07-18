import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    user: User;
    course: Course;
    createdAt: Date;
    updatedAt: Date;
}
