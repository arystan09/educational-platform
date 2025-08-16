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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const review_entity_1 = require("../../reviews/review.entity");
const chapter_entity_1 = require("../../chapters/chapter.entity");
const course_progress_entity_1 = require("../../progress/entities/course_progress.entity");
const quiz_entity_1 = require("../../quizzes/entities/quiz.entity");
const assignment_entity_1 = require("../../assignments/entites/assignment.entity");
const enrollment_entity_1 = require("../../enrollment/entities/enrollment.entity");
const certificate_entity_1 = require("../../certificates/entities/certificate.entity");
const media_file_entity_1 = require("../../media/entities/media-file.entity");
let Course = class Course {
    id;
    title;
    description;
    duration;
    price;
    category;
    thumbnailUrl;
    createdBy;
    isPublished;
    chapters;
    reviews;
    progress;
    assignments;
    enrollments;
    certificates;
    quizzes;
    mediaFiles;
    createdAt;
    updatedAt;
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Course.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.courses, { onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.Chapter, (chapter) => chapter.course),
    __metadata("design:type", Array)
], Course.prototype, "chapters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.course),
    __metadata("design:type", Array)
], Course.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_progress_entity_1.CourseProgress, (progress) => progress.course),
    __metadata("design:type", Array)
], Course.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assignment_entity_1.Assignment, assignment => assignment.course),
    __metadata("design:type", Array)
], Course.prototype, "assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (enrollment) => enrollment.course),
    __metadata("design:type", Array)
], Course.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (cert) => cert.course),
    __metadata("design:type", Array)
], Course.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, (quiz) => quiz.course),
    __metadata("design:type", Array)
], Course.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_file_entity_1.MediaFile, (mediaFile) => mediaFile.course),
    __metadata("design:type", Array)
], Course.prototype, "mediaFiles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)()
], Course);
//# sourceMappingURL=course.entity.js.map