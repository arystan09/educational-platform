import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/review.entity';
import { Chapter } from '../../chapters/chapter.entity';
import { CourseProgress } from '../../progress/entities/course_progress.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @ManyToOne(() => User, (user) => user.courses, { onDelete: 'SET NULL' })
  createdBy: User;

  @Column({ default: false })
  isPublished: boolean;

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters: Chapter[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => CourseProgress, (progress) => progress.course)
  progress: CourseProgress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
