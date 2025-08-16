import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findPublished();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateCourseDto, @CurrentUser() user: User) {
    return this.coursesService.create(dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: CreateCourseDto,
    @CurrentUser() user: User,
  ) {
    return this.coursesService.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/publish')
  publish(@Param('id', ParseIntPipe) id: string, @CurrentUser() user: User) {
    return this.coursesService.publish(id, user);
  }
}
