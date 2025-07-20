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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const enrollment_entity_1 = require("../enrollment/entities/enrollment.entity");
const certificate_entity_1 = require("../certificates/entities/certificate.entity");
const quiz_result_entity_1 = require("../quizzes/entities/quiz-result.entity");
const assignment_submission_entity_1 = require("../assignments/entites/assignment-submission.entity");
const assignment_submission_entity_2 = require("../assignments/entites/assignment-submission.entity");
let AnalyticsService = class AnalyticsService {
    userRepo;
    courseRepo;
    enrollRepo;
    certRepo;
    quizResultRepo;
    submissionRepo;
    constructor(userRepo, courseRepo, enrollRepo, certRepo, quizResultRepo, submissionRepo) {
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
        this.enrollRepo = enrollRepo;
        this.certRepo = certRepo;
        this.quizResultRepo = quizResultRepo;
        this.submissionRepo = submissionRepo;
    }
    async getUserStats({ from, to }) {
        return {
            totalUsers: await this.userRepo.count(),
            newUsers: await this.userRepo.count({
                where: { createdAt: (0, typeorm_2.Between)(new Date(from), new Date(to)) },
            }),
        };
    }
    async getCourseStats({ from, to }) {
        const totalEnrollments = await this.enrollRepo.count();
        const popularCourses = await this.enrollRepo
            .createQueryBuilder('enrollment')
            .select('enrollment.courseId', 'courseId')
            .addSelect('COUNT(*)', 'count')
            .groupBy('enrollment.courseId')
            .orderBy('count', 'DESC')
            .limit(5)
            .getRawMany();
        const completedCourses = await this.enrollRepo.count({
            where: { completed: true },
        });
        return {
            totalEnrollments,
            topCourses: popularCourses,
            completedCourses,
        };
    }
    async getQuizStats({ from, to }) {
        const results = await this.quizResultRepo.find({
            where: { createdAt: (0, typeorm_2.Between)(new Date(from), new Date(to)) },
        });
        const averageScore = results.reduce((sum, res) => sum + res.score, 0) / results.length || 0;
        return {
            totalQuizzes: results.length,
            averageScore: +averageScore.toFixed(2),
        };
    }
    async getCertificateStats({ from, to }) {
        const results = await this.certRepo
            .createQueryBuilder('certificate')
            .select('certificate.courseId', 'courseId')
            .addSelect('COUNT(*)', 'count')
            .where('certificate.issuedAt BETWEEN :from AND :to', { from, to })
            .groupBy('certificate.courseId')
            .getRawMany();
        return results;
    }
    async getAssignmentStats({ from, to }) {
        const submissions = await this.submissionRepo.find({
            where: { submittedAt: (0, typeorm_2.Between)(new Date(from), new Date(to)) },
        });
        const total = submissions.length;
        const reviewed = submissions.filter((s) => s.status === assignment_submission_entity_2.SubmissionStatus.REVIEWED).length;
        const pending = submissions.filter((s) => s.status === assignment_submission_entity_2.SubmissionStatus.PENDING).length;
        return {
            totalSubmissions: total,
            reviewed,
            pending,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(3, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __param(4, (0, typeorm_1.InjectRepository)(quiz_result_entity_1.QuizResult)),
    __param(5, (0, typeorm_1.InjectRepository)(assignment_submission_entity_1.AssignmentSubmission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map