import { Course } from '../courses/course.entity';
export declare class Chapter {
    id: number;
    title: string;
    content: string;
    videoUrl?: string;
    order: number;
    course: Course;
    createdAt: Date;
    updatedAt: Date;
}
