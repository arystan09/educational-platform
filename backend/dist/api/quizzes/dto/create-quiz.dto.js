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
exports.CreateQuizDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QuizOptionDto {
    text;
    isCorrect;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizOptionDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], QuizOptionDto.prototype, "isCorrect", void 0);
class QuizQuestionDto {
    question;
    type;
    options;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizQuestionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuizOptionDto),
    __metadata("design:type", Array)
], QuizQuestionDto.prototype, "options", void 0);
class CreateQuizDto {
    title;
    description;
    courseId;
    questions;
}
exports.CreateQuizDto = CreateQuizDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuizQuestionDto),
    __metadata("design:type", Array)
], CreateQuizDto.prototype, "questions", void 0);
//# sourceMappingURL=create-quiz.dto.js.map