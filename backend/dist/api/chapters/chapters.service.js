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
exports.ChaptersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chapter_entity_1 = require("./chapter.entity");
const course_entity_1 = require("../courses/course.entity");
let ChaptersService = class ChaptersService {
    chapterRepo;
    courseRepo;
    constructor(chapterRepo, courseRepo) {
        this.chapterRepo = chapterRepo;
        this.courseRepo = courseRepo;
    }
    async findByCourse(courseId) {
        return this.chapterRepo.find({
            where: { course: { id: courseId } },
            order: { order: 'ASC' },
        });
    }
    async create(dto) {
        const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        const chapter = this.chapterRepo.create({ ...dto, course });
        return this.chapterRepo.save(chapter);
    }
    async update(id, dto) {
        const chapter = await this.chapterRepo.findOne({ where: { id } });
        if (!chapter)
            throw new common_1.NotFoundException('Глава не найдена');
        Object.assign(chapter, dto);
        return this.chapterRepo.save(chapter);
    }
    async delete(id) {
        const result = await this.chapterRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Глава не найдена');
        return { message: 'Удалено' };
    }
};
exports.ChaptersService = ChaptersService;
exports.ChaptersService = ChaptersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChaptersService);
//# sourceMappingURL=chapters.service.js.map