import { Review } from '../reviews/review.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    reviews: Review[];
}
