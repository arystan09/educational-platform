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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const enrollment_entity_1 = require("../enrollment/entities/enrollment.entity");
const enrollment_status_enum_1 = require("../enrollment/enums/enrollment-status.enum");
const role_enum_1 = require("../users/enums/role.enum");
let AdminService = class AdminService {
    userRepo;
    courseRepo;
    enrollmentRepo;
    constructor(userRepo, courseRepo, enrollmentRepo) {
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
        this.enrollmentRepo = enrollmentRepo;
    }
    async getAllUsers() {
        return this.userRepo.find({
            relations: ['enrollments', 'enrollments.course'],
            where: { role: role_enum_1.Role.STUDENT }
        });
    }
    async updateUserRole(id, dto) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.role = dto.role;
        return this.userRepo.save(user);
    }
    async grantCourseAccess(dto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const existingEnrollment = await this.enrollmentRepo.findOne({
            where: { user: { id: dto.userId }, course: { id: dto.courseId } }
        });
        if (existingEnrollment) {
            existingEnrollment.status = enrollment_status_enum_1.EnrollmentStatus.APPROVED;
            return this.enrollmentRepo.save(existingEnrollment);
        }
        const enrollment = this.enrollmentRepo.create({
            user,
            course,
            status: enrollment_status_enum_1.EnrollmentStatus.APPROVED,
        });
        return this.enrollmentRepo.save(enrollment);
    }
    async revokeCourseAccess(userId, courseId) {
        const enrollment = await this.enrollmentRepo.findOne({
            where: { user: { id: userId }, course: { id: courseId } }
        });
        if (!enrollment) {
            throw new common_1.NotFoundException('Enrollment not found');
        }
        await this.enrollmentRepo.remove(enrollment);
        return { message: 'Course access revoked successfully' };
    }
    async getUserEnrollments(userId) {
        const enrollments = await this.enrollmentRepo.find({
            where: { user: { id: userId } },
            relations: ['course'],
        });
        return enrollments;
    }
    async getAllEnrollments() {
        return this.enrollmentRepo.find({
            relations: ['user', 'course'],
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map