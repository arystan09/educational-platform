import { QuizQuestion } from './quiz-question.entity';
export declare class QuizOption {
    id: number;
    text: string;
    isCorrect: boolean;
    question: QuizQuestion;
}
