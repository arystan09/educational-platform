import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Quiz } from './quiz.entity';
import { QuizOption } from './quiz-option.entity';

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question: string;

  @Column({ type: 'varchar' })
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';

  @ManyToOne(() => Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz;

  @OneToMany(() => QuizOption, option => option.question, { cascade: true, onDelete: 'CASCADE' })
  options: QuizOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
