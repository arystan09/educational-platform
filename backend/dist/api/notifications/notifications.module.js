"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const mail_service_1 = require("./mail/mail.service");
const notifications_service_1 = require("./notifications.service");
const notifications_controller_1 = require("./notifications.controller");
const users_module_1 = require("../users/users.module");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification]),
            users_module_1.UsersModule,
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    transport: {
                        host: config.get('MAIL_HOST'),
                        port: config.get('MAIL_PORT'),
                        secure: false,
                        auth: {
                            user: config.get('MAIL_USER'),
                            pass: config.get('MAIL_PASS'),
                        },
                    },
                    defaults: {
                        from: config.get('MAIL_FROM'),
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'mail/templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [mail_service_1.MailService, notifications_service_1.NotificationsService],
        exports: [mail_service_1.MailService, notifications_service_1.NotificationsService],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map