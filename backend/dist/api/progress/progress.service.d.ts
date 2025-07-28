import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Course } from '../courses/entites/course.entity';
import { CourseProgress } from './entities/course_progress.entity';
import { CertificateService } from '../certificates/certificate.service';
import { User } from '../users/entities/user.entity';
export declare class ProgressService {
    private readonly progressRepo;
    private readonly chapterRepo;
    private readonly courseRepo;
    private readonly courseProgressRepo;
    private readonly userRepo;
    private readonly certificateService;
    constructor(progressRepo: Repository<Progress>, chapterRepo: Repository<Chapter>, courseRepo: Repository<Course>, courseProgressRepo: Repository<CourseProgress>, userRepo: Repository<User>, certificateService: CertificateService);
    markComplete(userId: string, chapterId: string): Promise<Progress>;
    getCompletedChapters(userId: string, courseId: string): Promise<Progress[]>;
    getProgressPercent(userId: string, courseId: string): Promise<{
        completed: number;
        total: number;
        percent: number;
    }>;
    markChapterCompleted(userId: string, courseId: string, chapterId: string): Promise<CourseProgress>;
    getCertificate(userId: string, courseId: string): Promise<{
        certificateUrl: string;
    }>;
}
