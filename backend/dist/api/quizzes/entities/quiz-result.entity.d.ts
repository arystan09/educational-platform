import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';
export declare class QuizResult {
    id: number;
    user: User;
    userId: string;
    quiz: Quiz;
    quizId: string;
    score: number;
    createdAt: Date;
    completedAt: Date;
}
