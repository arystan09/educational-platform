import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import { CreateMediaFileDto } from './dto/create-media-file.dto';
import { Course } from '../courses/entites/course.entity';
import { Chapter } from '../chapters/chapter.entity'; // Corrected import path

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaFile) private mediaRepository: Repository<MediaFile>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Chapter) private chapterRepository: Repository<Chapter>,
  ) {}

  async create(courseId: string, createMediaFileDto: CreateMediaFileDto): Promise<MediaFile> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    let chapter: Chapter | null = null;
    if (createMediaFileDto.chapterId) {
      chapter = await this.chapterRepository.findOne({ where: { id: createMediaFileDto.chapterId } });
      if (!chapter) {
        throw new NotFoundException('Chapter not found');
      }
    }

    const mediaFile = this.mediaRepository.create({
      title: createMediaFileDto.title,
      description: createMediaFileDto.description,
      type: createMediaFileDto.type,
      url: createMediaFileDto.url,
      size: createMediaFileDto.size,
      duration: createMediaFileDto.duration,
      course: course,
      chapter: chapter || undefined,
    });

    return this.mediaRepository.save(mediaFile);
  }

  async findAllByCourse(courseId: string): Promise<MediaFile[]> {
    return this.mediaRepository.find({
      where: { course: { id: courseId } },
      relations: ['course', 'chapter'],
    });
  }

  async findOne(id: string): Promise<MediaFile> {
    const mediaFile = await this.mediaRepository.findOne({
      where: { id },
      relations: ['course', 'chapter'],
    });
    if (!mediaFile) {
      throw new NotFoundException(`Media file with ID ${id} not found`);
    }
    return mediaFile;
  }

  async update(id: string, updateMediaFileDto: Partial<CreateMediaFileDto>): Promise<MediaFile> {
    const mediaFile = await this.findOne(id);

    if (updateMediaFileDto.chapterId) {
      const chapter = await this.chapterRepository.findOne({ where: { id: updateMediaFileDto.chapterId } });
      if (!chapter) {
        throw new NotFoundException('Chapter not found');
      }
      mediaFile.chapter = chapter;
    }

    Object.assign(mediaFile, updateMediaFileDto);
    return this.mediaRepository.save(mediaFile);
  }

  async remove(id: string): Promise<void> {
    const mediaFile = await this.findOne(id);
    await this.mediaRepository.remove(mediaFile);
  }
} 