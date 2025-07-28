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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entites/course.entity");
let CoursesService = class CoursesService {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async findAll() {
        return this.courseRepository.find({
            where: { isPublished: true },
            relations: ['createdBy'],
        });
    }
    async findOne(id) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['createdBy'],
        });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        return course;
    }
    async create(dto, creator) {
        const course = this.courseRepository.create({
            ...dto,
            createdBy: creator,
        });
        return this.courseRepository.save(course);
    }
    async update(id, dto, user) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['createdBy'],
        });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        if (course.createdBy?.id !== user.id && user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Недостаточно прав для редактирования');
        }
        Object.assign(course, dto);
        return this.courseRepository.save(course);
    }
    async delete(id, user) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['createdBy'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        if (course.createdBy?.id !== user.id && user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Недостаточно прав для удаления');
        }
        await this.courseRepository.remove(course);
    }
    async publish(id, user) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['createdBy'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Курс не найден');
        }
        if (course.createdBy?.id !== user.id && user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Недостаточно прав для публикации');
        }
        course.isPublished = true;
        return this.courseRepository.save(course);
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map