import { Quiz } from './quiz.entity';
import { QuizOption } from './quiz-option.entity';
export declare class QuizQuestion {
    id: string;
    question: string;
    type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
    quiz: Quiz;
    options: QuizOption[];
    createdAt: Date;
    updatedAt: Date;
}
