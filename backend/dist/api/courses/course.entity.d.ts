import { User } from '../users/user.entity';
import { Review } from '../reviews/review.entity';
export declare class Course {
    id: number;
    title: string;
    description: string;
    thumbnailUrl?: string;
    createdBy: User;
    isPublished: boolean;
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}
