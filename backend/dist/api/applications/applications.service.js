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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("../applications/entities/application.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ApplicationsService = class ApplicationsService {
    appRepo;
    courseRepo;
    userRepo;
    constructor(appRepo, courseRepo, userRepo) {
        this.appRepo = appRepo;
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
    }
    async apply(userId, courseId) {
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        const existing = await this.appRepo.findOne({ where: { user: { id: userId }, course } });
        if (existing)
            throw new common_1.ConflictException('Заявка уже отправлена');
        const application = this.appRepo.create({
            user: { id: userId },
            course,
        });
        return this.appRepo.save(application);
    }
    async getUserApplications(userId) {
        return this.appRepo.find({ where: { user: { id: userId } } });
    }
    async getAllApplications() {
        return this.appRepo.find();
    }
    async changeStatus(id, status) {
        const app = await this.appRepo.findOneBy({ id });
        if (!app)
            throw new common_1.NotFoundException('Заявка не найдена');
        app.status = status;
        return this.appRepo.save(app);
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map