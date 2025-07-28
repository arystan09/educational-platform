"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const analytics_service_1 = require("./analytics.service");
const analytics_controller_1 = require("./analytics.controller");
const admin_analytics_controller_1 = require("../admin/admin-analytics.controller");
const user_entity_1 = require("../users/entities/user.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const enrollment_entity_1 = require("../enrollment/entities/enrollment.entity");
const certificate_entity_1 = require("../certificates/entities/certificate.entity");
const quiz_result_entity_1 = require("../quizzes/entities/quiz-result.entity");
const assignment_submission_entity_1 = require("../assignments/entites/assignment-submission.entity");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                course_entity_1.Course,
                enrollment_entity_1.Enrollment,
                certificate_entity_1.Certificate,
                quiz_result_entity_1.QuizResult,
                assignment_submission_entity_1.AssignmentSubmission,
            ]),
        ],
        controllers: [analytics_controller_1.AnalyticsController, admin_analytics_controller_1.AdminAnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map