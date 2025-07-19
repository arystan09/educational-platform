"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const progress_service_1 = require("./progress.service");
const progress_controller_1 = require("./progress.controller");
const progress_entity_1 = require("./entities/progress.entity");
const chapter_entity_1 = require("../chapters/chapter.entity");
const course_progress_entity_1 = require("./entities/course_progress.entity");
const courses_module_1 = require("../courses/courses.module");
const users_module_1 = require("../users/users.module");
const certificate_module_1 = require("../certificates/certificate.module");
let ProgressModule = class ProgressModule {
};
exports.ProgressModule = ProgressModule;
exports.ProgressModule = ProgressModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([progress_entity_1.Progress, chapter_entity_1.Chapter, course_progress_entity_1.CourseProgress]),
            courses_module_1.CoursesModule,
            users_module_1.UsersModule,
            certificate_module_1.CertificateModule,
        ],
        providers: [progress_service_1.ProgressService],
        controllers: [progress_controller_1.ProgressController],
    })
], ProgressModule);
//# sourceMappingURL=progress.module.js.map