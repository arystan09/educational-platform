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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    configService;
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = {
            sendMail: async (mailOptions) => {
                console.log('📧 EMAIL SENT (Development Mode):');
                console.log('To:', mailOptions.to);
                console.log('Subject:', mailOptions.subject);
                console.log('Content preview:', mailOptions.html.substring(0, 200) + '...');
                console.log('📧 End of email log');
                return Promise.resolve({ messageId: 'dev-' + Date.now() });
            }
        };
    }
    async sendVerificationEmail(email, token, name) {
        const verificationUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:3001'}/verify-email?token=${token}`;
        const mailOptions = {
            from: this.configService.get('EMAIL_USER') || 'your-email@gmail.com',
            to: email,
            subject: 'Подтверждение регистрации - Образовательная платформа',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Добро пожаловать на образовательную платформу!</h2>
          
          <p>Здравствуйте, ${name}!</p>
          
          <p>Спасибо за регистрацию на нашей образовательной платформе. Для завершения регистрации, пожалуйста, подтвердите ваш email адрес.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Подтвердить Email
            </a>
          </div>
          
          <p>Или скопируйте и вставьте этот токен на странице подтверждения:</p>
          <div style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace; margin: 10px 0;">
            ${token}
          </div>
          
          <p>Этот токен действителен в течение 24 часов.</p>
          
          <p>Если вы не регистрировались на нашей платформе, просто проигнорируйте это письмо.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">
            Это автоматическое письмо, не отвечайте на него.
          </p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`✅ Verification email sent to ${email}`);
        }
        catch (error) {
            console.error('❌ Failed to send verification email:', error);
        }
    }
    async sendPasswordResetEmail(email, token, name) {
        const resetUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:3001'}/reset-password?token=${token}`;
        const mailOptions = {
            from: this.configService.get('EMAIL_USER') || 'your-email@gmail.com',
            to: email,
            subject: 'Сброс пароля - Образовательная платформа',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Сброс пароля</h2>
          
          <p>Здравствуйте, ${name}!</p>
          
          <p>Вы запросили сброс пароля для вашего аккаунта. Для создания нового пароля, пожалуйста, перейдите по ссылке ниже:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Сбросить пароль
            </a>
          </div>
          
          <p>Или скопируйте и вставьте этот токен на странице сброса пароля:</p>
          <div style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace; margin: 10px 0;">
            ${token}
          </div>
          
          <p>Этот токен действителен в течение 1 часа.</p>
          
          <p>Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">
            Это автоматическое письмо, не отвечайте на него.
          </p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`✅ Password reset email sent to ${email}`);
        }
        catch (error) {
            console.error('❌ Failed to send password reset email:', error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map