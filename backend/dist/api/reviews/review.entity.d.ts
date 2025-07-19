import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    user: User;
    course: Course;
    createdAt: Date;
    updatedAt: Date;
}
