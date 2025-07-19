import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';

@Injectable()
export class CertificateService {
  async generate(user: User, course: Course): Promise<string> {
    const certsDir = path.resolve(__dirname, '..', '..', 'certificates');
    if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir);

    const fileName = `${user.id}_${course.id}_${Date.now()}.pdf`;
    const filePath = path.join(certsDir, fileName);

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
}
