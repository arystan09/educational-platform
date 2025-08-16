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
exports.ChapterProgress = void 0;
const typeorm_1 = require("typeorm");
const chapter_entity_1 = require("./chapter.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ChapterProgress = class ChapterProgress {
    id;
    chapter;
    chapterId;
    user;
    userId;
    completed;
    completedAt;
    createdAt;
    updatedAt;
};
exports.ChapterProgress = ChapterProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter, { onDelete: 'CASCADE' }),
    __metadata("design:type", chapter_entity_1.Chapter)
], ChapterProgress.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "chapterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], ChapterProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChapterProgress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChapterProgress.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ChapterProgress.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChapterProgress.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChapterProgress.prototype, "updatedAt", void 0);
exports.ChapterProgress = ChapterProgress = __decorate([
    (0, typeorm_1.Entity)()
], ChapterProgress);
//# sourceMappingURL=chapter-progress.entity.js.map