import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/review.entity';
import { Chapter } from '../../chapters/chapter.entity';
import { CourseProgress } from '../../progress/entities/course_progress.entity';
export declare class Course {
    id: number;
    title: string;
    description: string;
    thumbnailUrl?: string;
    createdBy: User;
    isPublished: boolean;
    chapters: Chapter[];
    reviews: Review[];
    progress: CourseProgress[];
    createdAt: Date;
    updatedAt: Date;
}
