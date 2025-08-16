import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { Chapter } from './chapter.entity';
import { ChapterProgress } from './chapter-progress.entity';
import { Course } from '../courses/entites/course.entity';
import { User } from '../users/entities/user.entity';
import { Application } from '../applications/entities/application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chapter, ChapterProgress, Course, User, Application]),
  ],
  providers: [ChaptersService],
  controllers: [ChaptersController],
})
export class ChaptersModule {}
