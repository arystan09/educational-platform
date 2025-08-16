import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../courses/entites/course.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Course, course => course.quizzes)
  course: Course;

  @OneToMany(() => QuizQuestion, question => question.quiz, { cascade: true })
  questions: QuizQuestion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
