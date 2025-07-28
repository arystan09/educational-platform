import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class QuizOption {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => QuizQuestion, question => question.options)
  question: QuizQuestion;
}
