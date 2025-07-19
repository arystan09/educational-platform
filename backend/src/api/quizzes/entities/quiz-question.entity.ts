import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from './quiz.entity';
import { QuizOption } from './quiz-option.entity';

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => QuizOption, option => option.question, { cascade: true })
  options: QuizOption[];
}
