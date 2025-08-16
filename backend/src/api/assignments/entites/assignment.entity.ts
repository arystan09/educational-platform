import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../courses/entites/course.entity';
import { AssignmentSubmission } from './assignment-submission.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Course, course => course.assignments, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => AssignmentSubmission, submission => submission.assignment)
  submissions: AssignmentSubmission[];

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
