import { Quiz } from './quiz.entity';
import { QuizOption } from './quiz-option.entity';
export declare class QuizQuestion {
    id: string;
    question: string;
    quiz: Quiz;
    options: QuizOption[];
}
