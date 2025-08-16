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
    submitQuiz(dto: SubmitQuizDto, userId: string): Promise<any>;
    findOne(id: string): Promise<Quiz | null>;
    getQuizzesForCourse(courseId: string): Promise<Quiz[]>;
    update(id: string, updateQuizDto: CreateQuizDto): Promise<Quiz>;
    remove(id: string): Promise<void>;
}
