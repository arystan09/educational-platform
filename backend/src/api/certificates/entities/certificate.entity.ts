import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entites/course.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.certificates, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.certificates, { onDelete: 'CASCADE' })
  course: Course;

  @CreateDateColumn()
  issuedAt: Date;
}
