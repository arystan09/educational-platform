import { Course } from '../../courses/entites/course.entity';
import { QuizQuestion } from './quiz-question.entity';
export declare class Quiz {
    id: number;
    title: string;
    course: Course;
    questions: QuizQuestion[];
}
