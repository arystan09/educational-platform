import { Course } from '../courses/course.entity';
import { CourseProgress } from '../progress/entities/course_progress.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Review } from '../reviews/review.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    courses: Course[];
    courseProgress: CourseProgress[];
    progress: Progress[];
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}
