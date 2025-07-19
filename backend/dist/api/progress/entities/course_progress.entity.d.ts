import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';
export declare class CourseProgress {
    id: number;
    user: User;
    course: Course;
    completedChapters: Record<number, boolean>;
    certificateUrl: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
