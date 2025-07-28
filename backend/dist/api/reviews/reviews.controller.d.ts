import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly service;
    constructor(service: ReviewsService);
    createOrUpdate(userId: string, courseId: string, dto: CreateReviewDto): Promise<import("./review.entity").Review>;
    getByCourse(courseId: string): Promise<import("./review.entity").Review[]>;
    getAverage(courseId: string): Promise<number>;
    delete(userId: string, courseId: string): Promise<import("./review.entity").Review>;
}
