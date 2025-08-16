import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';
import { EnrollmentStatus } from '../enums/enrollment-status.enum';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: EnrollmentStatus;
}
