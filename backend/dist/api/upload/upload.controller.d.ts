import { UploadService } from '../../services/upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        size: number;
    }>;
}
