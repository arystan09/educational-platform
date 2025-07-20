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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const analytics_service_1 = require("./analytics.service");
const date_range_dto_1 = require("./dto/date-range.dto");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getUserStats(range) {
        return this.analyticsService.getUserStats(range);
    }
    getCourseStats(range) {
        return this.analyticsService.getCourseStats(range);
    }
    getQuizStats(range) {
        return this.analyticsService.getQuizStats(range);
    }
    getCertificateStats(range) {
        return this.analyticsService.getCertificateStats(range);
    }
    getAssignmentStats(range) {
        return this.analyticsService.getAssignmentStats(range);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)('courses'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getCourseStats", null);
__decorate([
    (0, common_1.Get)('quizzes'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getQuizStats", null);
__decorate([
    (0, common_1.Get)('certificates'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getCertificateStats", null);
__decorate([
    (0, common_1.Get)('assignments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getAssignmentStats", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map