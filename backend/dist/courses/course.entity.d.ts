import { User } from '../users/user.entity';
export declare class Course {
    id: number;
    title: string;
    description: string;
    thumbnailUrl?: string;
    createdBy: User;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}
