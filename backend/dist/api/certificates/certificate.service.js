"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
let CertificateService = class CertificateService {
    async generate(user, course) {
        const certsDir = path.resolve(__dirname, '..', '..', 'certificates');
        if (!fs.existsSync(certsDir))
            fs.mkdirSync(certsDir);
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
};
exports.CertificateService = CertificateService;
exports.CertificateService = CertificateService = __decorate([
    (0, common_1.Injectable)()
], CertificateService);
//# sourceMappingURL=certificate.service.js.map