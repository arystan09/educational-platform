import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { ChapterProgress } from './chapter-progress.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
export declare class ChaptersService {
    private chapterRepo;
    private progressRepo;
    private courseRepo;
    private userRepo;
    constructor(chapterRepo: Repository<Chapter>, progressRepo: Repository<ChapterProgress>, courseRepo: Repository<Course>, userRepo: Repository<User>);
    findByCourse(courseId: string): Promise<Chapter[]>;
    create(dto: CreateChapterDto): Promise<Chapter>;
    update(id: string, dto: CreateChapterDto): Promise<Chapter>;
    delete(id: string): Promise<{
        message: string;
    }>;
    markComplete(chapterId: string, userId: string): Promise<{
        message: string;
        chapterId: string;
        userId: string;
        completed: boolean;
    }>;
    getChapterProgress(chapterId: string, userId: string): Promise<{
        completed: boolean;
        completedAt: Date;
    } | {
        completed: boolean;
        completedAt?: undefined;
    }>;
    unmarkComplete(chapterId: string, userId: string): Promise<{
        message: string;
        chapterId: string;
        userId: string;
        completed: boolean;
    }>;
}
