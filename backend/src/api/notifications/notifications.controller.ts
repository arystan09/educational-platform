import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @Get('/user/:userId')
  async getByUser(@Param('userId') userId: string) {
    const notifications = await this.notificationsService.findAll(userId);
    if (!notifications || notifications.length === 0) {
      throw new NotFoundException('Notifications not found');
    }
    return notifications;
  }

  @Patch('/:id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }
}
