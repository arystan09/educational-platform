import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaFile } from './entities/media-file.entity';
import { Course } from '../courses/entites/course.entity';
import { Chapter } from '../chapters/chapter.entity'; // Corrected import path

@Module({
  imports: [TypeOrmModule.forFeature([MediaFile, Course, Chapter])],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {} 