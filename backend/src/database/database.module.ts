import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../api/courses/entites/course.entity';
import { Chapter } from '../api/chapters/chapter.entity';
import { Assignment } from '../api/assignments/entites/assignment.entity';
import { Quiz } from '../api/quizzes/entities/quiz.entity';
import { QuizQuestion } from '../api/quizzes/entities/quiz-question.entity';
import { QuizOption } from '../api/quizzes/entities/quiz-option.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Chapter,
      Assignment,
      Quiz,
      QuizQuestion,
      QuizOption,
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class DatabaseModule {} 