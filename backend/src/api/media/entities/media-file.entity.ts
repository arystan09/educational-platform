import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../courses/entites/course.entity';
import { Chapter } from '../../chapters/chapter.entity'; // Corrected import path
import { forwardRef } from '@nestjs/common'; // Added for circular dependency

export enum MediaType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
}

@Entity()
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  type: MediaType;

  @Column()
  url: string;

  @Column('int')
  size: number;

  @Column('int', { nullable: true })
  duration: number;

  @ManyToOne(() => Course, course => course.mediaFiles, { onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(() => Chapter, chapter => chapter.mediaFiles, { nullable: true, onDelete: 'CASCADE' })
  chapter: Chapter;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 