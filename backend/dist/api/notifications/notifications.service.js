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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("./mail/mail.service");
let NotificationsService = class NotificationsService {
    notificationsRepo;
    usersService;
    mailService;
    constructor(notificationsRepo, usersService, mailService) {
        this.notificationsRepo = notificationsRepo;
        this.usersService = usersService;
        this.mailService = mailService;
    }
    async create(dto) {
        const user = await this.usersService.findById(+dto.userId);
        if (!user)
            throw new Error('User not found');
        const notification = this.notificationsRepo.create({
            type: dto.type,
            message: dto.message,
            user,
        });
        const saved = await this.notificationsRepo.save(notification);
        if (dto.sendEmail && user.email) {
            await this.mailService.sendMail(user.email, this.getEmailSubject(dto.type), this.getEmailTemplate(dto.type), dto.metadata || {});
        }
        return saved;
    }
    async findAll(userId) {
        return this.notificationsRepo.find({
            where: { user: { id: +userId } },
            order: { createdAt: 'DESC' },
        });
    }
    async markAsRead(id) {
        await this.notificationsRepo.update(id, { isRead: true });
    }
    async delete(id) {
        const result = await this.notificationsRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return { deleted: true };
    }
    getEmailSubject(type) {
        const subjects = {
            ASSIGNMENT_ADDED: 'Новое задание на платформе',
            ASSIGNMENT_REVIEWED: 'Ваше задание проверено',
            QUIZ_GRADED: 'Оценка за квиз',
            CERTIFICATE_ISSUED: 'Получен сертификат',
            COURSE_APPLICATION: 'Заявка на курс',
        };
        return subjects[type] ?? 'Уведомление';
    }
    getEmailTemplate(type) {
        const templates = {
            ASSIGNMENT_ADDED: 'assignment-added',
            ASSIGNMENT_REVIEWED: 'assignment-reviewed',
            QUIZ_GRADED: 'quiz-graded',
            CERTIFICATE_ISSUED: 'certificate-issued',
            COURSE_APPLICATION: 'course-application',
        };
        return templates[type] ?? 'default';
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        mail_service_1.MailService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map