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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const quiz_result_entity_1 = require("./entities/quiz-result.entity");
const quiz_question_entity_1 = require("./entities/quiz-question.entity");
const quiz_option_entity_1 = require("./entities/quiz-option.entity");
let QuizzesService = class QuizzesService {
    quizRepo;
    resultRepo;
    questionRepo;
    optionRepo;
    constructor(quizRepo, resultRepo, questionRepo, optionRepo) {
        this.quizRepo = quizRepo;
        this.resultRepo = resultRepo;
        this.questionRepo = questionRepo;
        this.optionRepo = optionRepo;
    }
    async create(dto) {
        const quiz = this.quizRepo.create({
            title: dto.title,
            course: { id: dto.courseId },
            questions: dto.questions.map((q) => this.questionRepo.create({
                question: q.question,
                options: q.options.map((opt) => this.optionRepo.create({
                    text: opt.text,
                    isCorrect: opt.isCorrect,
                })),
            })),
        });
        return await this.quizRepo.save(quiz);
    }
    async submitQuiz(dto) {
        const quiz = await this.quizRepo.findOne({
            where: { id: dto.quizId },
            relations: ['questions', 'questions.options'],
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${dto.quizId} not found`);
        }
        let score = 0;
        for (const answer of dto.answers) {
            const question = quiz.questions.find((q) => q.id === answer.questionId);
            if (!question) {
                throw new common_1.NotFoundException(`Question with ID ${answer.questionId} not found in quiz`);
            }
            const correctOption = question.options.find((opt) => opt.isCorrect);
            if (correctOption?.id === answer.selectedOptionId) {
                score++;
            }
        }
        const result = this.resultRepo.create({
            user: { id: 1 },
            quiz: { id: dto.quizId },
            score,
        });
        return await this.resultRepo.save(result);
    }
    async findOne(id) {
        return await this.quizRepo.findOne({
            where: { id },
            relations: ['questions', 'questions.options'],
        });
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_result_entity_1.QuizResult)),
    __param(2, (0, typeorm_1.InjectRepository)(quiz_question_entity_1.QuizQuestion)),
    __param(3, (0, typeorm_1.InjectRepository)(quiz_option_entity_1.QuizOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map