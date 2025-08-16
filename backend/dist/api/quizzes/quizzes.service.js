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
            description: dto.description,
            course: { id: dto.courseId },
        });
        const savedQuiz = await this.quizRepo.save(quiz);
        for (const questionDto of dto.questions) {
            const question = this.questionRepo.create({
                question: questionDto.question,
                type: questionDto.type,
                quiz: savedQuiz,
            });
            const savedQuestion = await this.questionRepo.save(question);
            for (const optionDto of questionDto.options) {
                const option = this.optionRepo.create({
                    text: optionDto.text,
                    isCorrect: optionDto.isCorrect,
                    question: savedQuestion,
                });
                await this.optionRepo.save(option);
            }
        }
        const result = await this.findOne(savedQuiz.id);
        if (!result) {
            throw new common_1.NotFoundException('Failed to create quiz');
        }
        return result;
    }
    async submitQuiz(dto, userId) {
        console.log('🔍 submitQuiz called with:', { dto, userId });
        const quiz = await this.quizRepo.findOne({
            where: { id: dto.quizId },
            relations: ['questions', 'questions.options'],
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${dto.quizId} not found`);
        }
        console.log('✅ Found quiz:', quiz.id);
        let score = 0;
        const results = [];
        for (const answer of dto.answers) {
            const question = quiz.questions.find((q) => q.id === answer.questionId);
            if (!question) {
                throw new common_1.NotFoundException(`Question with ID ${answer.questionId} not found in quiz`);
            }
            const selectedOption = question.options.find((opt) => opt.id === answer.selectedOptionId);
            if (!selectedOption) {
                throw new common_1.NotFoundException(`Selected option ID ${answer.selectedOptionId} not found for question ${answer.questionId}`);
            }
            const isCorrect = selectedOption.isCorrect;
            if (isCorrect) {
                score++;
            }
            results.push({
                questionId: question.id,
                question: question.question,
                selectedOption: selectedOption.text,
                correctOption: question.options.find(opt => opt.isCorrect)?.text,
                isCorrect: isCorrect
            });
        }
        const totalQuestions = quiz.questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        const result = this.resultRepo.create({
            score: score,
        });
        result.user = { id: userId };
        result.quiz = { id: dto.quizId };
        result.userId = userId;
        result.quizId = dto.quizId;
        const savedResult = await this.resultRepo.save(result);
        return {
            result: savedResult,
            score: score,
            totalQuestions: totalQuestions,
            percentage: percentage,
            details: results
        };
    }
    async findOne(id) {
        return await this.quizRepo.findOne({
            where: { id },
            relations: ['questions', 'questions.options'],
        });
    }
    async getQuizzesForCourse(courseId) {
        return this.quizRepo.find({
            where: { course: { id: courseId } },
            relations: ['questions', 'questions.options'],
        });
    }
    async update(id, updateQuizDto) {
        const quiz = await this.quizRepo.findOne({ where: { id } });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        await this.resultRepo.delete({ quizId: id });
        quiz.title = updateQuizDto.title;
        quiz.description = updateQuizDto.description;
        await this.quizRepo.save(quiz);
        for (const questionDto of updateQuizDto.questions) {
            const question = this.questionRepo.create({
                question: questionDto.question,
                type: questionDto.type,
                quiz: quiz,
            });
            const savedQuestion = await this.questionRepo.save(question);
            for (const optionDto of questionDto.options) {
                const option = this.optionRepo.create({
                    text: optionDto.text,
                    isCorrect: optionDto.isCorrect,
                    question: savedQuestion,
                });
                await this.optionRepo.save(option);
            }
        }
        const updatedQuiz = await this.findOne(id);
        if (!updatedQuiz) {
            throw new common_1.NotFoundException(`Failed to retrieve updated quiz`);
        }
        return updatedQuiz;
    }
    async remove(id) {
        const quiz = await this.quizRepo.findOne({ where: { id } });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        await this.quizRepo.remove(quiz);
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