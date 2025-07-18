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
exports.ChaptersController = void 0;
const common_1 = require("@nestjs/common");
const chapters_service_1 = require("./chapters.service");
const create_chapter_dto_1 = require("./dto/create-chapter.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("../applications/entities/application.entity");
const user_id_decorator_1 = require("../auth/decorators/user-id.decorator");
const user_entity_1 = require("../users/user.entity");
let ChaptersController = class ChaptersController {
    chaptersService;
    applicationRepo;
    constructor(chaptersService, applicationRepo) {
        this.chaptersService = chaptersService;
        this.applicationRepo = applicationRepo;
    }
    async findByCourse(courseId, user) {
        const application = await this.applicationRepo.findOne({
            where: {
                user: { id: user.id },
                course: { id: courseId },
                status: application_entity_1.ApplicationStatus.APPROVED,
            },
        });
        if (!application) {
            throw new common_1.ForbiddenException('Нет доступа к курсу');
        }
        return this.chaptersService.findByCourse(courseId);
    }
    create(dto) {
        return this.chaptersService.create(dto);
    }
    update(id, dto) {
        return this.chaptersService.update(id, dto);
    }
    delete(id) {
        return this.chaptersService.delete(id);
    }
};
exports.ChaptersController = ChaptersController;
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ChaptersController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chapter_dto_1.CreateChapterDto]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_chapter_dto_1.CreateChapterDto]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "delete", null);
exports.ChaptersController = ChaptersController = __decorate([
    (0, common_1.Controller)('chapters'),
    __param(1, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __metadata("design:paramtypes", [chapters_service_1.ChaptersService,
        typeorm_2.Repository])
], ChaptersController);
//# sourceMappingURL=chapters.controller.js.map