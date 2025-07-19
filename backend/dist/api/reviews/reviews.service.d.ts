import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
export declare class ReviewsService {
    private readonly reviewRepo;
    private readonly courseRepo;
    private readonly userRepo;
    constructor(reviewRepo: Repository<Review>, courseRepo: Repository<Course>, userRepo: Repository<User>);
    createOrUpdate(userId: number, courseId: number, dto: Partial<Review>): Promise<Review>;
    findByCourse(courseId: number): Promise<Review[]>;
    getAverageRating(courseId: number): Promise<number>;
    delete(userId: number, courseId: number): Promise<Review>;
}
