import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Course } from '../courses/entites/course.entity';
import { CourseProgress } from './entities/course_progress.entity';
export declare class ProgressService {
    private readonly progressRepo;
    private readonly chapterRepo;
    private readonly courseRepo;
    private readonly courseProgressRepo;
    constructor(progressRepo: Repository<Progress>, chapterRepo: Repository<Chapter>, courseRepo: Repository<Course>, courseProgressRepo: Repository<CourseProgress>);
    markComplete(userId: number, chapterId: number): Promise<Progress>;
    getCompletedChapters(userId: number, courseId: number): Promise<Progress[]>;
    getProgressPercent(userId: number, courseId: number): Promise<{
        completed: number;
        total: number;
        percent: number;
    }>;
    markChapterCompleted(userId: number, courseId: number, chapterId: number): Promise<CourseProgress>;
}
