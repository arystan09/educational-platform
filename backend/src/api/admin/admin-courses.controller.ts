import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { CoursesService } from '../courses/courses.service';
import { CreateCourseDto } from '../courses/dto/create-course.dto';
import { UpdateCourseDto } from '../courses/dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

@Controller('admin/courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminCoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  create(@Body() dto: CreateCourseDto, @Req() req: RequestWithUser) {
    return this.courseService.create(dto, req.user);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @Req() req: RequestWithUser,
  ) {
    return this.courseService.update(id, dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.courseService.delete(id, req.user);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.courseService.publish(id, req.user);
  }
}
