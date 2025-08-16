import { Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import { CreateMediaFileDto } from './dto/create-media-file.dto';
import { Course } from '../courses/entites/course.entity';
import { Chapter } from '../chapters/chapter.entity';
export declare class MediaService {
    private mediaRepository;
    private courseRepository;
    private chapterRepository;
    constructor(mediaRepository: Repository<MediaFile>, courseRepository: Repository<Course>, chapterRepository: Repository<Chapter>);
    create(courseId: string, createMediaFileDto: CreateMediaFileDto): Promise<MediaFile>;
    findAllByCourse(courseId: string): Promise<MediaFile[]>;
    findOne(id: string): Promise<MediaFile>;
    update(id: string, updateMediaFileDto: Partial<CreateMediaFileDto>): Promise<MediaFile>;
    remove(id: string): Promise<void>;
}
