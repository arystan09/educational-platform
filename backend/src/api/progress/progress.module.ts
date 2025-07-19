import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';
import { CourseProgress } from './entities/course_progress.entity';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Progress, Chapter, CourseProgress]),
    CoursesModule,
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
