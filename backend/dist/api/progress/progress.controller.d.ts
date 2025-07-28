import { ProgressService } from './progress.service';
import { MarkCompleteDto } from './dto/mark-complete.dto';
export declare class ProgressController {
    private readonly service;
    constructor(service: ProgressService);
    markComplete(userId: string, dto: MarkCompleteDto): Promise<import("./entities/progress.entity").Progress>;
    markChapterCompleted(userId: string, courseId: string, chapterId: string): Promise<import("./entities/course_progress.entity").CourseProgress>;
    getCompleted(userId: string, courseId: string): Promise<import("./entities/progress.entity").Progress[]>;
    getPercent(userId: string, courseId: string): Promise<{
        completed: number;
        total: number;
        percent: number;
    }>;
    getCertificate(userId: string, courseId: string): Promise<{
        certificateUrl: string;
    }>;
}
