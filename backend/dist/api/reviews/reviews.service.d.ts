import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
export declare class ReviewsService {
    private readonly reviewRepo;
    private readonly courseRepo;
    private readonly userRepo;
    constructor(reviewRepo: Repository<Review>, courseRepo: Repository<Course>, userRepo: Repository<User>);
    createOrUpdate(userId: string, courseId: string, dto: Partial<Review>): Promise<Review>;
    findByCourse(courseId: string): Promise<Review[]>;
    getAverageRating(courseId: string): Promise<number>;
    delete(userId: string, courseId: string): Promise<Review>;
    findPending(): Promise<Review[]>;
    approve(id: string): Promise<Review>;
    reject(id: string): Promise<Review>;
}
