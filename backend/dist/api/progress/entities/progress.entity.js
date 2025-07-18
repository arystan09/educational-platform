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
exports.Progress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/user.entity");
const chapter_entity_1 = require("../../chapters/chapter.entity");
let Progress = class Progress {
    id;
    user;
    chapter;
    completedAt;
};
exports.Progress = Progress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Progress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Progress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter),
    __metadata("design:type", chapter_entity_1.Chapter)
], Progress.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Progress.prototype, "completedAt", void 0);
exports.Progress = Progress = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['user', 'chapter'])
], Progress);
//# sourceMappingURL=progress.entity.js.map