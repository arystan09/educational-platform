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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./review.entity");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../courses/entites/course.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ReviewsService = class ReviewsService {
    reviewRepo;
    courseRepo;
    userRepo;
    constructor(reviewRepo, courseRepo, userRepo) {
        this.reviewRepo = reviewRepo;
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
    }
    async createOrUpdate(userId, courseId, dto) {
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!course)
            throw new common_1.NotFoundException('Курс не найден');
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('Пользователь не найден');
        let review = await this.reviewRepo.findOne({
            where: {
                user: { id: userId },
                course: { id: courseId },
            },
        });
        if (review) {
            Object.assign(review, dto);
        }
        else {
            review = this.reviewRepo.create({
                ...dto,
                user,
                course,
            });
        }
        return await this.reviewRepo.save(review);
    }
    async findByCourse(courseId) {
        return this.reviewRepo.find({
            where: { course: { id: courseId } },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async getAverageRating(courseId) {
        const { avg } = await this.reviewRepo
            .createQueryBuilder('r')
            .select('AVG(r.rating)', 'avg')
            .where('r.courseId = :courseId', { courseId })
            .getRawOne();
        return Math.round(parseFloat(avg || '0') * 10) / 10;
    }
    async delete(userId, courseId) {
        const review = await this.reviewRepo.findOne({
            where: {
                user: { id: userId },
                course: { id: courseId },
            },
        });
        if (!review)
            throw new common_1.NotFoundException('Отзыв не найден');
        return this.reviewRepo.remove(review);
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map