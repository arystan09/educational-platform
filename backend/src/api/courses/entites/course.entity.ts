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
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Assignment } from '../../assignments/entites/assignment.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Certificate } from '../../certificates/entities/certificate.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: string;

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

  @OneToMany(() => Assignment, assignment => assignment.course)
  assignments: Assignment[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Certificate, (cert) => cert.user)
  certificates: Certificate[];

  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizzes: Quiz[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
