import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Course } from '../../courses/entites/course.entity';
import { CourseProgress } from '../../progress/entities/course_progress.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Review } from '../../reviews/review.entity';
import { Role } from '../enums/role.enum';
import { AssignmentSubmission } from '../../assignments/entites/assignment-submission.entity';

import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Certificate } from '../../certificates/entities/certificate.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false, default: 'Unnamed' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: 'STUDENT' })
  role: Role;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true })
  emailVerificationExpires: Date;

  @OneToMany(() => Course, (course) => course.createdBy)
  courses: Course[];

  @OneToMany(() => CourseProgress, (cp) => cp.user)
  courseProgress: CourseProgress[];

  @OneToMany(() => Progress, (p) => p.user)
  progress: Progress[];

  @OneToMany(() => AssignmentSubmission, sub => sub.student)
  assignmentSubmissions: AssignmentSubmission[];
  


  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Certificate, (cert) => cert.user)
  certificates: Certificate[];

  @OneToMany(() => Review, (r) => r.user)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
