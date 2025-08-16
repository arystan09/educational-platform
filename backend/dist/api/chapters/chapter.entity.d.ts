import { Course } from '../courses/entites/course.entity';
import { MediaFile } from '../media/entities/media-file.entity';
export declare class Chapter {
    id: string;
    title: string;
    content: string;
    videoUrl?: string;
    order: number;
    course: Course;
    mediaFiles: MediaFile[];
    createdAt: Date;
    updatedAt: Date;
}
