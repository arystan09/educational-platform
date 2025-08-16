import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // For development, we'll use a mock transporter that logs emails
    // In production, you'd use a real email service like SendGrid, AWS SES, etc.
    this.transporter = {
      sendMail: async (mailOptions: any) => {
        console.log('📧 EMAIL SENT (Development Mode):');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Content preview:', mailOptions.html.substring(0, 200) + '...');
        console.log('📧 End of email log');
        return Promise.resolve({ messageId: 'dev-' + Date.now() });
      }
    } as any;
  }

  async sendVerificationEmail(email: string, token: string, name: string): Promise<void> {
    const verificationUrl = `${this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3001'}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER') || 'your-email@gmail.com',
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
    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      // Don't throw error in development - just log it
      // In production, you might want to handle this differently
    }
  }

  async sendPasswordResetEmail(email: string, token: string, name: string): Promise<void> {
    const resetUrl = `${this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3001'}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER') || 'your-email@gmail.com',
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
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
    }
  }
} 