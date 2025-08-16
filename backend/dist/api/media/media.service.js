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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_file_entity_1 = require("./entities/media-file.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const chapter_entity_1 = require("../chapters/chapter.entity");
let MediaService = class MediaService {
    mediaRepository;
    courseRepository;
    chapterRepository;
    constructor(mediaRepository, courseRepository, chapterRepository) {
        this.mediaRepository = mediaRepository;
        this.courseRepository = courseRepository;
        this.chapterRepository = chapterRepository;
    }
    async create(courseId, createMediaFileDto) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        let chapter = null;
        if (createMediaFileDto.chapterId) {
            chapter = await this.chapterRepository.findOne({ where: { id: createMediaFileDto.chapterId } });
            if (!chapter) {
                throw new common_1.NotFoundException('Chapter not found');
            }
        }
        const mediaFile = this.mediaRepository.create({
            title: createMediaFileDto.title,
            description: createMediaFileDto.description,
            type: createMediaFileDto.type,
            url: createMediaFileDto.url,
            size: createMediaFileDto.size,
            duration: createMediaFileDto.duration,
            course: course,
            chapter: chapter || undefined,
        });
        return this.mediaRepository.save(mediaFile);
    }
    async findAllByCourse(courseId) {
        return this.mediaRepository.find({
            where: { course: { id: courseId } },
            relations: ['course', 'chapter'],
        });
    }
    async findOne(id) {
        const mediaFile = await this.mediaRepository.findOne({
            where: { id },
            relations: ['course', 'chapter'],
        });
        if (!mediaFile) {
            throw new common_1.NotFoundException(`Media file with ID ${id} not found`);
        }
        return mediaFile;
    }
    async update(id, updateMediaFileDto) {
        const mediaFile = await this.findOne(id);
        if (updateMediaFileDto.chapterId) {
            const chapter = await this.chapterRepository.findOne({ where: { id: updateMediaFileDto.chapterId } });
            if (!chapter) {
                throw new common_1.NotFoundException('Chapter not found');
            }
            mediaFile.chapter = chapter;
        }
        Object.assign(mediaFile, updateMediaFileDto);
        return this.mediaRepository.save(mediaFile);
    }
    async remove(id) {
        const mediaFile = await this.findOne(id);
        await this.mediaRepository.remove(mediaFile);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_file_entity_1.MediaFile)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map