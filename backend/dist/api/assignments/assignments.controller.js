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
exports.AssignmentsController = void 0;
const common_1 = require("@nestjs/common");
const assignments_service_1 = require("./assignments.service");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const submit_assignment_dto_1 = require("./dto/submit-assignment.dto");
const grade_assignment_dto_1 = require("./dto/grade-assignment.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../users/enums/role.enum");
let AssignmentsController = class AssignmentsController {
    assignmentsService;
    constructor(assignmentsService) {
        this.assignmentsService = assignmentsService;
    }
    create(dto) {
        return this.assignmentsService.createAssignment(dto);
    }
    async submit(dto, req) {
        const user = await this.assignmentsService.getUserById(req.user.sub);
        return this.assignmentsService.submitAssignment(dto, user);
    }
    grade(dto) {
        return this.assignmentsService.gradeSubmission(dto);
    }
    updateStatus(dto) {
        return this.assignmentsService.updateStatus(dto);
    }
    getByCourse(courseId) {
        return this.assignmentsService.getAssignmentsForCourse(courseId);
    }
    getSubmissions(id) {
        return this.assignmentsService.getSubmissionsForAssignment(id);
    }
    getMy(req) {
        return this.assignmentsService.getMySubmissions(req.user);
    }
};
exports.AssignmentsController = AssignmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.TEACHER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('submit'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.STUDENT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_assignment_dto_1.SubmitAssignmentDto, Object]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)('grade'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.TEACHER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [grade_assignment_dto_1.GradeAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "grade", null);
__decorate([
    (0, common_1.Patch)('status'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.TEACHER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getByCourse", null);
__decorate([
    (0, common_1.Get)(':assignmentId/submissions'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.TEACHER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getSubmissions", null);
__decorate([
    (0, common_1.Get)('my/submissions'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.STUDENT),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getMy", null);
exports.AssignmentsController = AssignmentsController = __decorate([
    (0, common_1.Controller)('courses/:courseId/assignments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [assignments_service_1.AssignmentsService])
], AssignmentsController);
//# sourceMappingURL=assignments.controller.js.map