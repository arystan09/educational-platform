import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { GradeAssignmentDto } from './dto/grade-assignment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';


@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Создание задания (только для преподавателя)
  @Post()
  @Roles(Role.TEACHER, Role.ADMIN)
  create(@Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.createAssignment(dto);
  }

  // Отправка задания студентом
  @Post('submit')
  @Roles(Role.STUDENT)
  submit(@Body() dto: SubmitAssignmentDto, @Request() req) {
    return this.assignmentsService.submitAssignment(dto, req.user);
  }

  // Оценка отправленного задания преподавателем
  @Post('grade')
  @Roles(Role.TEACHER, Role.ADMIN)
  grade(@Body() dto: GradeAssignmentDto) {
    return this.assignmentsService.gradeSubmission(dto);
  }

  // Обновление статуса отправки
  @Patch('status')
  @Roles(Role.TEACHER, Role.ADMIN)
  updateStatus(@Body() dto: UpdateStatusDto) {
    return this.assignmentsService.updateStatus(dto);
  }

  // Получить все задания по курсу
  @Get('course/:courseId')
  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  getByCourse(@Param('courseId') courseId: string) {
    return this.assignmentsService.getAssignmentsForCourse(courseId);
  }

  // Получить все отправки по заданию
  @Get(':assignmentId/submissions')
  @Roles(Role.TEACHER, Role.ADMIN)
  getSubmissions(@Param('assignmentId') id: string) {
    return this.assignmentsService.getSubmissionsForAssignment(id);
  }

  // Получить отправки текущего студента
  @Get('my/submissions')
  @Roles(Role.STUDENT)
  getMy(@Request() req) {
    return this.assignmentsService.getMySubmissions(req.user);
  }
}
