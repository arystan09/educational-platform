export declare class UploadService {
    private uploadDir;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        size: number;
    }>;
}
