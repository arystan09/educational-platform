import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Post('submit')
  submit(@Body() submitQuizDto: SubmitQuizDto) {
    return this.quizzesService.submitQuiz(submitQuizDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quizzesService.findOne(+id);
  }
}
