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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const seeder_service_1 = require("./database/seeder.service");
const users_module_1 = require("./api/users/users.module");
const auth_module_1 = require("./api/auth/auth.module");
const courses_module_1 = require("./api/courses/courses.module");
const chapters_module_1 = require("./api/chapters/chapters.module");
const applications_module_1 = require("./api/applications/applications.module");
const progress_module_1 = require("./api/progress/progress.module");
const reviews_module_1 = require("./api/reviews/reviews.module");
const quizzes_module_1 = require("./api/quizzes/quizzes.module");
const assignments_module_1 = require("./api/assignments/assignments.module");
const enrollment_module_1 = require("./api/enrollment/enrollment.module");
const certificate_module_1 = require("./api/certificates/certificate.module");
const analytics_module_1 = require("./api/analytics/analytics.module");
const admin_module_1 = require("./api/admin/admin.module");
const media_module_1 = require("./api/media/media.module");
const upload_module_1 = require("./api/upload/upload.module");
let AppModule = class AppModule {
    seederService;
    constructor(seederService) {
        this.seederService = seederService;
    }
    async onModuleInit() {
        await this.seederService.seed();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'sqlite',
                    database: 'database.sqlite',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
            chapters_module_1.ChaptersModule,
            progress_module_1.ProgressModule,
            applications_module_1.ApplicationsModule,
            reviews_module_1.ReviewsModule,
            quizzes_module_1.QuizzesModule,
            assignments_module_1.AssignmentsModule,
            enrollment_module_1.EnrollmentModule,
            certificate_module_1.CertificateModule,
            analytics_module_1.AnalyticsModule,
            admin_module_1.AdminModule,
            media_module_1.MediaModule,
            upload_module_1.UploadModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [seeder_service_1.SeederService])
], AppModule);
//# sourceMappingURL=app.module.js.map