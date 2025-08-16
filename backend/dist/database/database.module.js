"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("../api/courses/entites/course.entity");
const chapter_entity_1 = require("../api/chapters/chapter.entity");
const assignment_entity_1 = require("../api/assignments/entites/assignment.entity");
const quiz_entity_1 = require("../api/quizzes/entities/quiz.entity");
const quiz_question_entity_1 = require("../api/quizzes/entities/quiz-question.entity");
const quiz_option_entity_1 = require("../api/quizzes/entities/quiz-option.entity");
const seeder_service_1 = require("./seeder.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                course_entity_1.Course,
                chapter_entity_1.Chapter,
                assignment_entity_1.Assignment,
                quiz_entity_1.Quiz,
                quiz_question_entity_1.QuizQuestion,
                quiz_option_entity_1.QuizOption,
            ]),
        ],
        providers: [seeder_service_1.SeederService],
        exports: [seeder_service_1.SeederService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map