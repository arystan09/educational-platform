import { QuizQuestion } from './quiz-question.entity';
export declare class QuizOption {
    id: string;
    text: string;
    isCorrect: boolean;
    question: QuizQuestion;
    createdAt: Date;
    updatedAt: Date;
}
