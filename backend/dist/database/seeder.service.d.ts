import { Repository } from 'typeorm';
import { Course } from '../api/courses/entites/course.entity';
import { Chapter } from '../api/chapters/chapter.entity';
import { Assignment } from '../api/assignments/entites/assignment.entity';
import { Quiz } from '../api/quizzes/entities/quiz.entity';
import { QuizQuestion } from '../api/quizzes/entities/quiz-question.entity';
import { QuizOption } from '../api/quizzes/entities/quiz-option.entity';
export declare class SeederService {
    private readonly courseRepository;
    private readonly chapterRepository;
    private readonly assignmentRepository;
    private readonly quizRepository;
    private readonly quizQuestionRepository;
    private readonly quizOptionRepository;
    constructor(courseRepository: Repository<Course>, chapterRepository: Repository<Chapter>, assignmentRepository: Repository<Assignment>, quizRepository: Repository<Quiz>, quizQuestionRepository: Repository<QuizQuestion>, quizOptionRepository: Repository<QuizOption>);
    seed(): Promise<void>;
}
