import { Injectable, NotFoundException } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';

@Injectable()
export class CertificateService {
  private certsDir = path.resolve(__dirname, '..', '..', 'certificates');

  async generate(user: User, course: Course): Promise<string> {
    if (!fs.existsSync(this.certsDir)) fs.mkdirSync(this.certsDir);

    const fileName = `${user.id}_${course.id}_${Date.now()}.pdf`;
    const filePath = path.join(this.certsDir, fileName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`This certifies that`, { align: 'center' });
    doc.moveDown();
    doc.font('Times-Roman').text(`has successfully completed the course:`, { align: 'center' });
    doc.fontSize(16).text(`${course.title}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.end();

    return `/certificates/${fileName}`;
  }

  // 🔍 Получить список всех сертификатов (файлов)
  findAll(): string[] {
    if (!fs.existsSync(this.certsDir)) return [];
    return fs.readdirSync(this.certsDir).filter(f => f.endsWith('.pdf'));
  }

  // ❌ Удалить сертификат по имени файла
  remove(fileName: string): string {
    const filePath = path.join(this.certsDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Certificate not found');
    }
    fs.unlinkSync(filePath);
    return 'Certificate deleted';
  }
}
