import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizResult } from './entities/quiz-result.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizOption } from './entities/quiz-option.entity';
export declare class QuizzesService {
    private readonly quizRepo;
    private readonly resultRepo;
    private readonly questionRepo;
    private readonly optionRepo;
    constructor(quizRepo: Repository<Quiz>, resultRepo: Repository<QuizResult>, questionRepo: Repository<QuizQuestion>, optionRepo: Repository<QuizOption>);
    create(dto: CreateQuizDto): Promise<Quiz>;
    submitQuiz(dto: SubmitQuizDto): Promise<QuizResult>;
    findOne(id: number): Promise<Quiz | null>;
}
