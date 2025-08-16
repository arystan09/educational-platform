import { MediaType } from '../entities/media-file.entity';
export declare class CreateMediaFileDto {
    title: string;
    description?: string;
    type: MediaType;
    url: string;
    size: number;
    duration?: number;
    chapterId?: string;
}
