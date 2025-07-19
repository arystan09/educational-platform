import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(createQuizDto: CreateQuizDto): Promise<import("./entities/quiz.entity").Quiz>;
    submit(submitQuizDto: SubmitQuizDto): Promise<import("./entities/quiz-result.entity").QuizResult>;
    findOne(id: number): Promise<import("./entities/quiz.entity").Quiz | null>;
}
