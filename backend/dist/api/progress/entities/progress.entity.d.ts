import { User } from '../../users/user.entity';
import { Chapter } from '../../chapters/chapter.entity';
export declare class Progress {
    id: number;
    user: User;
    chapter: Chapter;
    completedAt: Date;
}
