import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class QuizOption {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => QuizQuestion, question => question.options, { onDelete: 'CASCADE' })
  question: QuizQuestion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
