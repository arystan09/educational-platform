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
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("./entities/enrollment.entity");
const enrollment_status_enum_1 = require("./enums/enrollment-status.enum");
let EnrollmentService = class EnrollmentService {
    enrollmentRepository;
    constructor(enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    async countAll() {
        return this.enrollmentRepository.count();
    }
    async findAll() {
        return this.enrollmentRepository.find({
            relations: ['user', 'course'],
        });
    }
    async approve(id) {
        const enrollment = await this.enrollmentRepository.findOneBy({ id });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        enrollment.status = enrollment_status_enum_1.EnrollmentStatus.APPROVED;
        return this.enrollmentRepository.save(enrollment);
    }
    async reject(id) {
        const enrollment = await this.enrollmentRepository.findOneBy({ id });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        enrollment.status = enrollment_status_enum_1.EnrollmentStatus.REJECTED;
        return this.enrollmentRepository.save(enrollment);
    }
    async enroll(userId, courseId) {
        console.log('🔍 Enrolling user', userId, 'in course', courseId);
        try {
            const existingEnrollment = await this.enrollmentRepository.findOne({
                where: { user: { id: userId }, course: { id: courseId } },
            });
            if (existingEnrollment) {
                console.log('⚠️ User already enrolled in this course');
                return existingEnrollment;
            }
            const enrollment = this.enrollmentRepository.create({
                user: { id: userId },
                course: { id: courseId },
                status: enrollment_status_enum_1.EnrollmentStatus.PENDING,
            });
            console.log('💾 Saving enrollment:', enrollment);
            const savedEnrollment = await this.enrollmentRepository.save(enrollment);
            console.log('✅ Enrollment saved successfully:', savedEnrollment);
            return savedEnrollment;
        }
        catch (error) {
            console.error('❌ Enrollment error:', error);
            throw error;
        }
    }
    async getUserEnrollments(userId) {
        return this.enrollmentRepository.find({
            where: { user: { id: userId } },
            relations: ['course'],
        });
    }
    async checkUserAccess(userId, courseId) {
        const enrollment = await this.enrollmentRepository.findOne({
            where: {
                user: { id: userId },
                course: { id: courseId },
                status: enrollment_status_enum_1.EnrollmentStatus.APPROVED
            },
        });
        return !!enrollment;
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map