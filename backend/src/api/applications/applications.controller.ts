import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { ApplicationStatus } from './entities/application.entity';
import { UserId } from '../auth/decorators/user-id.decorator';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  apply(@UserId() userId: string, @Body() dto: CreateApplicationDto) {
    return this.service.apply(userId, dto.courseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  getMyApplications(@UserId() userId: string) {
    return this.service.getUserApplications(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.service.getAllApplications();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  changeStatus(@Param('id', ParseIntPipe) id: string, @Body('status') status: ApplicationStatus) {
    return this.service.changeStatus(id, status);
  }
}
