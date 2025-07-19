import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Course } from '../courses/entites/course.entity';
export declare class ChaptersService {
    private chapterRepo;
    private courseRepo;
    constructor(chapterRepo: Repository<Chapter>, courseRepo: Repository<Course>);
    findByCourse(courseId: number): Promise<Chapter[]>;
    create(dto: CreateChapterDto): Promise<Chapter>;
    update(id: number, dto: CreateChapterDto): Promise<Chapter>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
