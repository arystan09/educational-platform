import { ProgressService } from './progress.service';
import { MarkCompleteDto } from './dto/mark-complete.dto';
export declare class ProgressController {
    private readonly service;
    constructor(service: ProgressService);
    markComplete(userId: number, dto: MarkCompleteDto): Promise<import("./entities/progress.entity").Progress>;
    getCompleted(userId: number, courseId: number): Promise<import("./entities/progress.entity").Progress[]>;
    getPercent(userId: number, courseId: number): Promise<{
        completed: number;
        total: number;
        percent: number;
    }>;
}
