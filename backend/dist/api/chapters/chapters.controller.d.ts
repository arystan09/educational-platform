import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
export declare class ChaptersController {
    private readonly chaptersService;
    private readonly applicationRepo;
    constructor(chaptersService: ChaptersService, applicationRepo: Repository<Application>);
    findByCourse(courseId: string): Promise<import("./chapter.entity").Chapter[]>;
    create(courseId: string, dto: CreateChapterDto): Promise<import("./chapter.entity").Chapter>;
    update(courseId: string, id: string, dto: CreateChapterDto): Promise<import("./chapter.entity").Chapter>;
    delete(courseId: string, id: string): Promise<{
        message: string;
    }>;
    markComplete(courseId: string, id: string, userId: string): Promise<{
        message: string;
        chapterId: string;
        userId: string;
        completed: boolean;
    }>;
    unmarkComplete(courseId: string, id: string, userId: string): Promise<{
        message: string;
        chapterId: string;
        userId: string;
        completed: boolean;
    }>;
    getProgress(courseId: string, id: string, userId: string): Promise<{
        completed: boolean;
        completedAt: Date;
    } | {
        completed: boolean;
        completedAt?: undefined;
    }>;
}
