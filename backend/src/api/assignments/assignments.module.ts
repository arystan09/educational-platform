import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entites/assignment.entity';
import { AssignmentSubmission } from './entites/assignment-submission.entity';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, AssignmentSubmission, Course, User]),
    CoursesModule,
    UsersModule,
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
