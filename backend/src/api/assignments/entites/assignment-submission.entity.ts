import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Assignment } from './assignment.entity';
import { User } from '../../users/entities/user.entity';

export enum SubmissionStatus {
  PENDING = 'PENDING',
  NEEDS_REVISION = 'NEEDS_REVISION',
  GRADED = 'GRADED',
}

@Entity()
export class AssignmentSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Assignment, assignment => assignment.id, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  student: User;

  @Column({ nullable: true })
  fileUrl?: string;

  @Column({ type: 'text', nullable: true })
  textAnswer?: string;

  @Column({ type: 'float', nullable: true })
  grade?: number;

  @Column({ type: 'text', nullable: true })
  feedback?: string;

  @Column({ type: 'enum', enum: SubmissionStatus, default: SubmissionStatus.PENDING })
  status: SubmissionStatus;

  @CreateDateColumn()
  submittedAt: Date;
}
