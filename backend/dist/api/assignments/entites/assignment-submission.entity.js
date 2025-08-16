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
exports.AssignmentSubmission = exports.SubmissionStatus = void 0;
const typeorm_1 = require("typeorm");
const assignment_entity_1 = require("./assignment.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["PENDING"] = "PENDING";
    SubmissionStatus["REVIEWED"] = "REVIEWED";
    SubmissionStatus["REJECTED"] = "REJECTED";
    SubmissionStatus["GRADED"] = "GRADED";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
let AssignmentSubmission = class AssignmentSubmission {
    id;
    assignment;
    student;
    fileUrl;
    textAnswer;
    grade;
    feedback;
    status;
    submittedAt;
};
exports.AssignmentSubmission = AssignmentSubmission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AssignmentSubmission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assignment_entity_1.Assignment, assignment => assignment.submissions, { onDelete: 'CASCADE' }),
    __metadata("design:type", assignment_entity_1.Assignment)
], AssignmentSubmission.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.assignmentSubmissions, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], AssignmentSubmission.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AssignmentSubmission.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AssignmentSubmission.prototype, "textAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], AssignmentSubmission.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AssignmentSubmission.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'PENDING' }),
    __metadata("design:type", String)
], AssignmentSubmission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AssignmentSubmission.prototype, "submittedAt", void 0);
exports.AssignmentSubmission = AssignmentSubmission = __decorate([
    (0, typeorm_1.Entity)()
], AssignmentSubmission);
//# sourceMappingURL=assignment-submission.entity.js.map