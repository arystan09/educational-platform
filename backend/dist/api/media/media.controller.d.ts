import { MediaService } from './media.service';
import { CreateMediaFileDto } from './dto/create-media-file.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    create(courseId: string, createMediaFileDto: CreateMediaFileDto): Promise<import("./entities/media-file.entity").MediaFile>;
    findAll(courseId: string): Promise<import("./entities/media-file.entity").MediaFile[]>;
    findOne(id: string): Promise<import("./entities/media-file.entity").MediaFile>;
    update(id: string, updateMediaFileDto: Partial<CreateMediaFileDto>): Promise<import("./entities/media-file.entity").MediaFile>;
    remove(id: string): Promise<void>;
}
