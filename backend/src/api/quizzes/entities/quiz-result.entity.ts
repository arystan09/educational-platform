import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Quiz)
  quiz: Quiz;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  completedAt: Date;
}
