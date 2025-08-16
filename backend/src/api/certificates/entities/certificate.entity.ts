import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, user => user.certificates)
  user: User;

  @ManyToOne(() => Course, course => course.certificates)
  course: Course;

  @Column()
  certificateUrl: string;

  @CreateDateColumn()
  issuedAt: Date;
}
