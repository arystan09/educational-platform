import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Course, { eager: true })
  course: Course;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: ApplicationStatus;

  @CreateDateColumn()
  createdAt: Date;
}
