import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly service;
    constructor(service: ReviewsService);
    createOrUpdate(userId: number, courseId: number, dto: CreateReviewDto): Promise<import("./review.entity").Review>;
    getByCourse(courseId: number): Promise<import("./review.entity").Review[]>;
    getAverage(courseId: number): Promise<number>;
    delete(userId: number, courseId: number): Promise<import("./review.entity").Review>;
}
