import { Quiz } from './quiz.entity';
import { QuizOption } from './quiz-option.entity';
export declare class QuizQuestion {
    id: number;
    question: string;
    quiz: Quiz;
    options: QuizOption[];
}
