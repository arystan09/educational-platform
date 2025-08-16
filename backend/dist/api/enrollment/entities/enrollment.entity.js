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
exports.Enrollment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const course_entity_1 = require("../../courses/entites/course.entity");
const enrollment_status_enum_1 = require("../enums/enrollment-status.enum");
let Enrollment = class Enrollment {
    id;
    user;
    course;
    createdAt;
    completed;
    status;
};
exports.Enrollment = Enrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Enrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.enrollments, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Enrollment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.enrollments, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], Enrollment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Enrollment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Enrollment.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'PENDING' }),
    __metadata("design:type", String)
], Enrollment.prototype, "status", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, typeorm_1.Entity)()
], Enrollment);
//# sourceMappingURL=enrollment.entity.js.map