import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../../courses/entites/course.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, course => course.quizzes)
  course: Course;

  @OneToMany(() => QuizQuestion, question => question.quiz, { cascade: true })
  questions: QuizQuestion[];
}
