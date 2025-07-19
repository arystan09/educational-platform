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
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../applications/entities/application.entity';
import { UserId } from '../auth/decorators/user-id.decorator';
import { User } from '../users/entities/user.entity';

@Controller('chapters')
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
  ) {}

  // Защищенный метод с проверкой заявки
  @Get('course/:courseId')
  @UseGuards(AuthGuard('jwt'))
  async findByCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @UserId() user: User,
  ) {
    const application = await this.applicationRepo.findOne({
      where: { 
        user: { id: user.id }, 
        course: { id: courseId }, 
        status: ApplicationStatus.APPROVED,
      },
    });

    if (!application) {
      throw new ForbiddenException('Нет доступа к курсу');
    }

    return this.chaptersService.findByCourse(courseId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateChapterDto) {
    return this.chaptersService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateChapterDto) {
    return this.chaptersService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.chaptersService.delete(id);
  }
}
