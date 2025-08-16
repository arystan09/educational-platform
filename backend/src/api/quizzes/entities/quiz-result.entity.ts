import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  quiz: Quiz;

  @Column()
  quizId: string;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  completedAt: Date;
}
