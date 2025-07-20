import { NotificationType } from '../types/notification-type.enum';
export declare class CreateNotificationDto {
    readonly userId: string;
    readonly type: NotificationType;
    readonly message: string;
    readonly sendEmail?: boolean;
    readonly metadata?: Record<string, any>;
}
