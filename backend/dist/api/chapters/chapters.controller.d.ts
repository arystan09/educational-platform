import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { User } from '../users/entities/user.entity';
export declare class ChaptersController {
    private readonly chaptersService;
    private readonly applicationRepo;
    constructor(chaptersService: ChaptersService, applicationRepo: Repository<Application>);
    findByCourse(courseId: number, user: User): Promise<import("./chapter.entity").Chapter[]>;
    create(dto: CreateChapterDto): Promise<import("./chapter.entity").Chapter>;
    update(id: number, dto: CreateChapterDto): Promise<import("./chapter.entity").Chapter>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
