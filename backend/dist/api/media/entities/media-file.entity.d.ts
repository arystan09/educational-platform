import { Course } from '../../courses/entites/course.entity';
import { Chapter } from '../../chapters/chapter.entity';
export declare enum MediaType {
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    DOCUMENT = "DOCUMENT",
    IMAGE = "IMAGE",
    PDF = "PDF"
}
export declare class MediaFile {
    id: string;
    title: string;
    description: string;
    type: MediaType;
    url: string;
    size: number;
    duration: number;
    course: Course;
    chapter: Chapter;
    createdAt: Date;
    updatedAt: Date;
}
