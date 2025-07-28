import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { MailService } from './mail/mail.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const user = await this.usersService.findById(dto.userId);
    if (!user) throw new Error('User not found');

    const notification = this.notificationsRepo.create({
      type: dto.type,
      message: dto.message,
      user,
    });

    const saved = await this.notificationsRepo.save(notification);

    if (dto.sendEmail && user.email) {
      await this.mailService.sendMail(
        user.email,
        this.getEmailSubject(dto.type),
        this.getEmailTemplate(dto.type),
        dto.metadata || {},
      );
    }

    return saved;
  }

  async findAll(userId: string): Promise<Notification[]> {
    return this.notificationsRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await this.notificationsRepo.update(id, { isRead: true });
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.notificationsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Notification not found');
    }
    return { deleted: true };
  }

  private getEmailSubject(type: string): string {
    const subjects = {
      ASSIGNMENT_ADDED: 'Новое задание на платформе',
      ASSIGNMENT_REVIEWED: 'Ваше задание проверено',
      QUIZ_GRADED: 'Оценка за квиз',
      CERTIFICATE_ISSUED: 'Получен сертификат',
      COURSE_APPLICATION: 'Заявка на курс',
    };
    return subjects[type] ?? 'Уведомление';
  }

  private getEmailTemplate(type: string): string {
    const templates = {
      ASSIGNMENT_ADDED: 'assignment-added',
      ASSIGNMENT_REVIEWED: 'assignment-reviewed',
      QUIZ_GRADED: 'quiz-graded',
      CERTIFICATE_ISSUED: 'certificate-issued',
      COURSE_APPLICATION: 'course-application',
    };
    return templates[type] ?? 'default';
  }
}
