import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../courses/entites/course.entity';
import { MediaFile } from '../media/entities/media-file.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column()
  order: number;

  @ManyToOne(() => Course, (course) => course.id, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => MediaFile, (mediaFile) => mediaFile.chapter)
  mediaFiles: MediaFile[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
