import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';
export declare class QuizResult {
    id: number;
    user: User;
    quiz: Quiz;
    score: number;
    completedAt: Date;
}
