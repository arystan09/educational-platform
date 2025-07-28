import { ReviewsService } from '../reviews/reviews.service';
export declare class AdminReviewsController {
    private readonly reviewService;
    constructor(reviewService: ReviewsService);
    getPending(): Promise<import("../reviews/review.entity").Review[]>;
    approve(id: string): Promise<import("../reviews/review.entity").Review>;
    reject(id: string): Promise<import("../reviews/review.entity").Review>;
}
