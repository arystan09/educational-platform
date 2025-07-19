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
    markComplete(userId: number, chapterId: number): Promise<Progress>;
    getCompletedChapters(userId: number, courseId: number): Promise<Progress[]>;
    getProgressPercent(userId: number, courseId: number): Promise<{
        completed: number;
        total: number;
        percent: number;
    }>;
    markChapterCompleted(userId: number, courseId: number, chapterId: number): Promise<CourseProgress>;
    getCertificate(userId: number, courseId: number): Promise<{
        certificateUrl: string;
    }>;
}
