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
exports.ProgressController = void 0;
const common_1 = require("@nestjs/common");
const progress_service_1 = require("./progress.service");
const passport_1 = require("@nestjs/passport");
const user_id_decorator_1 = require("../auth/decorators/user-id.decorator");
const mark_complete_dto_1 = require("./dto/mark-complete.dto");
let ProgressController = class ProgressController {
    service;
    constructor(service) {
        this.service = service;
    }
    markComplete(userId, dto) {
        return this.service.markComplete(userId, dto.chapterId);
    }
    markChapterCompleted(userId, courseId, chapterId) {
        return this.service.markChapterCompleted(userId, courseId, chapterId);
    }
    getCompleted(userId, courseId) {
        return this.service.getCompletedChapters(userId, courseId);
    }
    getPercent(userId, courseId) {
        return this.service.getProgressPercent(userId, courseId);
    }
    getCertificate(userId, courseId) {
        return this.service.getCertificate(userId, courseId);
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Post)('complete'),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, mark_complete_dto_1.MarkCompleteDto]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "markComplete", null);
__decorate([
    (0, common_1.Post)('complete/:courseId/:chapterId'),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('chapterId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "markChapterCompleted", null);
__decorate([
    (0, common_1.Get)('completed/:courseId'),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "getCompleted", null);
__decorate([
    (0, common_1.Get)('percent/:courseId'),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "getPercent", null);
__decorate([
    (0, common_1.Get)('certificate/:courseId'),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "getCertificate", null);
exports.ProgressController = ProgressController = __decorate([
    (0, common_1.Controller)('progress'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map