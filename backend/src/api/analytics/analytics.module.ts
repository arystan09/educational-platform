import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entites/course.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { Certificate } from '../certificates/entities/certificate.entity';
import { QuizResult } from '../quizzes/entities/quiz-result.entity';
import { AssignmentSubmission } from '../assignments/entites/assignment-submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Course,
      Enrollment,
      Certificate,
      QuizResult,
      AssignmentSubmission,
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
