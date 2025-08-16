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
import { MediaFile } from '../../media/entities/media-file.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  duration: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  category: string;

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

  @OneToMany(() => Certificate, (cert) => cert.course)
  certificates: Certificate[];

  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizzes: Quiz[];

  @OneToMany(() => MediaFile, (mediaFile) => mediaFile.course)
  mediaFiles: MediaFile[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
