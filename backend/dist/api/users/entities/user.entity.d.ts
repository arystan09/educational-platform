import { Course } from '../../courses/entites/course.entity';
import { CourseProgress } from '../../progress/entities/course_progress.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Review } from '../../reviews/review.entity';
import { Role } from '../enums/role.enum';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    courses: Course[];
    courseProgress: CourseProgress[];
    progress: Progress[];
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}
