import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('courses/:courseId/quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Param('courseId') courseId: string, @Body() createQuizDto: CreateQuizDto) {
    createQuizDto.courseId = courseId;
    return this.quizzesService.create(createQuizDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('submit')
  submit(@Body() submitQuizDto: SubmitQuizDto, @Request() req) {
    const userId: string = req.user.sub;
    return this.quizzesService.submitQuiz(submitQuizDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getByCourse(@Param('courseId') courseId: string) {
    return this.quizzesService.getQuizzesForCourse(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: CreateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
