import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
export declare class ChaptersController {
    private readonly chaptersService;
    constructor(chaptersService: ChaptersService);
    findByCourse(courseId: number): Promise<import("./chapter.entity").Chapter[]>;
    create(dto: CreateChapterDto): Promise<import("./chapter.entity").Chapter>;
    update(id: number, dto: CreateChapterDto): Promise<import("./chapter.entity").Chapter>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
