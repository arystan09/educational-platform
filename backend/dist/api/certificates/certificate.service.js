"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const certificate_entity_1 = require("./entities/certificate.entity");
let CertificateService = class CertificateService {
    certificateRepository;
    certsDir = path.resolve(__dirname, '..', '..', 'certificates');
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }
    async getUserCertificates(userId) {
        return this.certificateRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'course'],
        });
    }
    async generate(user, course) {
        if (!fs.existsSync(this.certsDir))
            fs.mkdirSync(this.certsDir);
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
    findAll() {
        if (!fs.existsSync(this.certsDir))
            return [];
        return fs.readdirSync(this.certsDir).filter(f => f.endsWith('.pdf'));
    }
    remove(fileName) {
        const filePath = path.join(this.certsDir, fileName);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Certificate not found');
        }
        fs.unlinkSync(filePath);
        return 'Certificate deleted';
    }
};
exports.CertificateService = CertificateService;
exports.CertificateService = CertificateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CertificateService);
//# sourceMappingURL=certificate.service.js.map