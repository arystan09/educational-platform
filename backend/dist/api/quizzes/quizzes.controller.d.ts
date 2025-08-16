import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(courseId: string, createQuizDto: CreateQuizDto): Promise<import("./entities/quiz.entity").Quiz>;
    submit(submitQuizDto: SubmitQuizDto, req: any): Promise<any>;
    getByCourse(courseId: string): Promise<import("./entities/quiz.entity").Quiz[]>;
    findOne(id: string): Promise<import("./entities/quiz.entity").Quiz | null>;
    update(id: string, updateQuizDto: CreateQuizDto): Promise<import("./entities/quiz.entity").Quiz>;
    remove(id: string): Promise<void>;
}
