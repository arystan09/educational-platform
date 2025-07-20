import { User } from '../../users/entities/user.entity';
import { NotificationType } from '../types/notification-type.enum';
export declare class Notification {
    id: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: Date;
    user: User;
}
