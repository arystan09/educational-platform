import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';
export declare class ProgressService {
    private readonly progressRepo;
    private readonly chapterRepo;
    constructor(progressRepo: Repository<Progress>, chapterRepo: Repository<Chapter>);
    markComplete(userId: number, chapterId: number): Promise<Progress>;
    getCompletedChapters(userId: number, courseId: number): Promise<Progress[]>;
    getProgressPercent(userId: number, courseId: number): Promise<{
        completed: number;
        total: number;
        percent: number;
    }>;
}
