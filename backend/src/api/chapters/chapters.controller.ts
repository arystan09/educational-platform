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
  ForbiddenException,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../applications/entities/application.entity';
import { UserId } from '../auth/decorators/user-id.decorator';
import { User } from '../users/entities/user.entity';

@Controller('courses/:courseId/chapters')
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
  ) {}

  // Get chapters for a course (all authenticated users can view)
  @Get()
  @UseGuards(JwtAuthGuard)
  async findByCourse(@Param('courseId', ParseIntPipe) courseId: string) {
    return this.chaptersService.findByCourse(courseId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Body() dto: CreateChapterDto
  ) {
    return this.chaptersService.create({ ...dto, courseId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Param('id', ParseIntPipe) id: string, 
    @Body() dto: CreateChapterDto
  ) {
    return this.chaptersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  delete(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Param('id', ParseIntPipe) id: string
  ) {
    return this.chaptersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/complete')
  async markComplete(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Param('id', ParseIntPipe) id: string,
    @UserId() userId: string
  ) {
    return this.chaptersService.markComplete(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/uncomplete')
  async unmarkComplete(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Param('id', ParseIntPipe) id: string,
    @UserId() userId: string
  ) {
    return this.chaptersService.unmarkComplete(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/progress')
  async getProgress(
    @Param('courseId', ParseIntPipe) courseId: string,
    @Param('id', ParseIntPipe) id: string,
    @UserId() userId: string
  ) {
    return this.chaptersService.getChapterProgress(id, userId);
  }
}
