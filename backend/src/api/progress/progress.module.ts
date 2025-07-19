import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress } from './entities/progress.entity';
import { Chapter } from '../chapters/chapter.entity';
import { CourseProgress } from './entities/course_progress.entity';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';
import { CertificateModule } from '../certificates/certificate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Progress, Chapter, CourseProgress]),
    CoursesModule,
    UsersModule,
    CertificateModule,
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
