"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const course_entity_1 = require("../courses/entites/course.entity");
const enrollment_entity_1 = require("../enrollment/entities/enrollment.entity");
const admin_courses_controller_1 = require("./admin-courses.controller");
const courses_module_1 = require("../courses/courses.module");
const admin_requests_controller_1 = require("./admin-requests.controller");
const enrollment_module_1 = require("../enrollment/enrollment.module");
const admin_reviews_controller_1 = require("./admin-reviews.controller");
const reviews_module_1 = require("../reviews/reviews.module");
const admin_certificates_controller_1 = require("./admin-certificates.controller");
const certificate_module_1 = require("../certificates/certificate.module");
const analytics_module_1 = require("../analytics/analytics.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, course_entity_1.Course, enrollment_entity_1.Enrollment]),
            courses_module_1.CoursesModule,
            enrollment_module_1.EnrollmentModule,
            reviews_module_1.ReviewsModule,
            certificate_module_1.CertificateModule,
            analytics_module_1.AnalyticsModule,
        ],
        controllers: [admin_controller_1.AdminController, admin_courses_controller_1.AdminCoursesController, admin_requests_controller_1.AdminRequestsController, admin_reviews_controller_1.AdminReviewsController, admin_certificates_controller_1.AdminCertificatesController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map