import { Chapter } from './chapter.entity';
import { User } from '../users/entities/user.entity';
export declare class ChapterProgress {
    id: number;
    chapter: Chapter;
    chapterId: number;
    user: User;
    userId: string;
    completed: boolean;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
