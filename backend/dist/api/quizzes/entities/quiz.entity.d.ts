import { Course } from '../../courses/entites/course.entity';
import { QuizQuestion } from './quiz-question.entity';
export declare class Quiz {
    id: string;
    title: string;
    description: string;
    course: Course;
    questions: QuizQuestion[];
    createdAt: Date;
    updatedAt: Date;
}
