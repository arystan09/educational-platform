import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';

@Entity()
export class CourseProgress {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, user => user.courseProgress)
  user: User;

  @ManyToOne(() => Course, course => course.progress)
  course: Course;

  @Column({ type: 'simple-json', default: '{}' })
  completedChapters: Record<number, boolean>;

  @Column({ nullable: true })
  certificateUrl: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}