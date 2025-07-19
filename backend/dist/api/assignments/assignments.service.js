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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assignment_entity_1 = require("./entites/assignment.entity");
const assignment_submission_entity_1 = require("./entites/assignment-submission.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const assignment_submission_entity_2 = require("./entites/assignment-submission.entity");
let AssignmentsService = class AssignmentsService {
    assignmentRepo;
    submissionRepo;
    courseRepo;
    constructor(assignmentRepo, submissionRepo, courseRepo) {
        this.assignmentRepo = assignmentRepo;
        this.submissionRepo = submissionRepo;
        this.courseRepo = courseRepo;
    }
    async createAssignment(dto) {
        const course = await this.courseRepo.findOne({
            where: { id: Number(dto.courseId) },
        });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        const assignment = this.assignmentRepo.create({
            title: dto.title,
            description: dto.description,
            dueDate: new Date(dto.dueDate),
            course,
        });
        return this.assignmentRepo.save(assignment);
    }
    async submitAssignment(dto, student) {
        const assignment = await this.assignmentRepo.findOne({
            where: { id: dto.assignmentId },
        });
        if (!assignment)
            throw new common_1.NotFoundException('Задание не найдено');
        const submission = this.submissionRepo.create({
            assignment,
            student,
            textAnswer: dto.textAnswer ?? undefined,
            ...(dto.fileUrl ? { fileUrl: dto.fileUrl } : {}),
        });
        return this.submissionRepo.save(submission);
    }
    async gradeSubmission(dto) {
        const submission = await this.submissionRepo.findOne({
            where: { id: dto.submissionId },
            relations: ['assignment', 'student'],
        });
        if (!submission)
            throw new common_1.NotFoundException('Отправка не найдена');
        submission.grade = dto.grade;
        submission.feedback = dto.feedback ?? undefined;
        submission.status = assignment_submission_entity_2.SubmissionStatus.GRADED;
        return this.submissionRepo.save(submission);
    }
    async updateStatus(dto) {
        const submission = await this.submissionRepo.findOneBy({ id: dto.submissionId });
        if (!submission)
            throw new common_1.NotFoundException('Отправка не найдена');
        submission.status = dto.status;
        return this.submissionRepo.save(submission);
    }
    async getAssignmentsForCourse(courseId) {
        return this.assignmentRepo.find({
            where: { course: { id: Number(courseId) } },
            relations: ['submissions'],
        });
    }
    async getSubmissionsForAssignment(assignmentId) {
        return this.submissionRepo.find({
            where: { assignment: { id: assignmentId } },
            relations: ['student'],
        });
    }
    async getMySubmissions(student) {
        return this.submissionRepo.find({
            where: { student: { id: student.id } },
            relations: ['assignment'],
        });
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __param(1, (0, typeorm_1.InjectRepository)(assignment_submission_entity_1.AssignmentSubmission)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map