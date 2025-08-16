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
exports.MediaFile = exports.MediaType = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entites/course.entity");
const chapter_entity_1 = require("../../chapters/chapter.entity");
var MediaType;
(function (MediaType) {
    MediaType["VIDEO"] = "VIDEO";
    MediaType["AUDIO"] = "AUDIO";
    MediaType["DOCUMENT"] = "DOCUMENT";
    MediaType["IMAGE"] = "IMAGE";
    MediaType["PDF"] = "PDF";
})(MediaType || (exports.MediaType = MediaType = {}));
let MediaFile = class MediaFile {
    id;
    title;
    description;
    type;
    url;
    size;
    duration;
    course;
    chapter;
    createdAt;
    updatedAt;
};
exports.MediaFile = MediaFile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaFile.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MediaFile.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaFile.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], MediaFile.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], MediaFile.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.mediaFiles, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], MediaFile.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter, chapter => chapter.mediaFiles, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", chapter_entity_1.Chapter)
], MediaFile.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MediaFile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MediaFile.prototype, "updatedAt", void 0);
exports.MediaFile = MediaFile = __decorate([
    (0, typeorm_1.Entity)()
], MediaFile);
//# sourceMappingURL=media-file.entity.js.map