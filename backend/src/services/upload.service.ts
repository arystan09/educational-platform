import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private uploadDir = 'uploads';

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; size: number }> {
    console.log('📁 Upload service called with file:', {
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    });

    // Ensure upload directory exists
    await mkdir(this.uploadDir, { recursive: true });

    // Generate unique filename
    const filename = `${uuidv4()}-${file.originalname}`;
    const filepath = join(this.uploadDir, filename);

    console.log('📁 Writing file to:', filepath);

    // Write file to disk
    await writeFile(filepath, file.buffer);

    const result = {
      url: `/uploads/${filename}`,
      size: file.size,
    };

    console.log('📁 Upload successful, returning:', result);

    // Return file info
    return result;
  }
} 