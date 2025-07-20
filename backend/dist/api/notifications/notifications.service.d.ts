import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UsersService } from '../users/users.service';
import { MailService } from './mail/mail.service';
export declare class NotificationsService {
    private readonly notificationsRepo;
    private readonly usersService;
    private readonly mailService;
    constructor(notificationsRepo: Repository<Notification>, usersService: UsersService, mailService: MailService);
    create(dto: CreateNotificationDto): Promise<Notification>;
    findAll(userId: string): Promise<Notification[]>;
    markAsRead(id: string): Promise<void>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    private getEmailSubject;
    private getEmailTemplate;
}
