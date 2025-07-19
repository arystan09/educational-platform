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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const progress_entity_1 = require("./entities/progress.entity");
const chapter_entity_1 = require("../chapters/chapter.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const course_progress_entity_1 = require("./entities/course_progress.entity");
const certificate_service_1 = require("../certificates/certificate.service");
const user_entity_1 = require("../users/entities/user.entity");
let ProgressService = class ProgressService {
    progressRepo;
    chapterRepo;
    courseRepo;
    courseProgressRepo;
    userRepo;
    certificateService;
    constructor(progressRepo, chapterRepo, courseRepo, courseProgressRepo, userRepo, certificateService) {
        this.progressRepo = progressRepo;
        this.chapterRepo = chapterRepo;
        this.courseRepo = courseRepo;
        this.courseProgressRepo = courseProgressRepo;
        this.userRepo = userRepo;
        this.certificateService = certificateService;
    }
    async markComplete(userId, chapterId) {
        const chapter = await this.chapterRepo.findOne({
            where: { id: chapterId },
            relations: ['course'],
        });
        if (!chapter)
            throw new common_1.NotFoundException('Глава не найдена');
        const exists = await this.progressRepo.findOne({
            where: { user: { id: userId }, chapter: { id: chapterId } },
        });
        if (exists)
            return exists;
        const progress = this.progressRepo.create({
            user: { id: userId },
            chapter,
        });
        return this.progressRepo.save(progress);
    }
    async getCompletedChapters(userId, courseId) {
        return this.progressRepo.find({
            where: {
                user: { id: userId },
                chapter: { course: { id: courseId } },
            },
            relations: ['chapter'],
        });
    }
    async getProgressPercent(userId, courseId) {
        const completed = await this.progressRepo.count({
            where: {
                user: { id: userId },
                chapter: { course: { id: courseId } },
            },
            relations: ['chapter'],
        });
        const total = await this.chapterRepo.count({
            where: { course: { id: courseId } },
        });
        const percent = total > 0 ? (completed / total) * 100 : 0;
        return { completed, total, percent: Math.round(percent) };
    }
    async markChapterCompleted(userId, courseId, chapterId) {
        let progress = await this.courseProgressRepo.findOne({
            where: { user: { id: userId }, course: { id: courseId } },
        });
        if (!progress) {
            progress = this.courseProgressRepo.create({
                user: { id: userId },
                course: { id: courseId },
                completedChapters: {},
            });
        }
        progress.completedChapters[chapterId] = true;
        const course = await this.courseRepo.findOne({
            where: { id: courseId },
            relations: ['chapters'],
        });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        const allCompleted = course.chapters.every((ch) => progress.completedChapters[ch.id]);
        progress.isCompleted = allCompleted;
        if (allCompleted && !progress.certificateUrl) {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException('Пользователь не найден');
            const certificateUrl = await this.certificateService.generate(user, course);
            progress.certificateUrl = certificateUrl;
        }
        return this.courseProgressRepo.save(progress);
    }
    async getCertificate(userId, courseId) {
        const progress = await this.courseProgressRepo.findOne({
            where: {
                user: { id: userId },
                course: { id: courseId },
            },
        });
        if (!progress || !progress.isCompleted) {
            throw new common_1.ForbiddenException('Курс ещё не завершён');
        }
        return { certificateUrl: progress.certificateUrl };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __param(1, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(3, (0, typeorm_1.InjectRepository)(course_progress_entity_1.CourseProgress)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        certificate_service_1.CertificateService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map