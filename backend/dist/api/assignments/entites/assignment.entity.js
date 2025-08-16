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
exports.Assignment = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entites/course.entity");
const assignment_submission_entity_1 = require("./assignment-submission.entity");
let Assignment = class Assignment {
    id;
    title;
    description;
    course;
    submissions;
    dueDate;
    createdAt;
    updatedAt;
};
exports.Assignment = Assignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Assignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Assignment.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Assignment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.assignments, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], Assignment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assignment_submission_entity_1.AssignmentSubmission, submission => submission.assignment),
    __metadata("design:type", Array)
], Assignment.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Assignment.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Assignment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Assignment.prototype, "updatedAt", void 0);
exports.Assignment = Assignment = __decorate([
    (0, typeorm_1.Entity)()
], Assignment);
//# sourceMappingURL=assignment.entity.js.map