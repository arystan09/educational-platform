import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizResult } from './entities/quiz-result.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizOption } from './entities/quiz-option.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,

    @InjectRepository(QuizResult)
    private readonly resultRepo: Repository<QuizResult>,

    @InjectRepository(QuizQuestion)
    private readonly questionRepo: Repository<QuizQuestion>,

    @InjectRepository(QuizOption)
    private readonly optionRepo: Repository<QuizOption>,
  ) {}

  async create(dto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepo.create({
      title: dto.title,
      course: { id: dto.courseId },
      questions: dto.questions.map((q) =>
        this.questionRepo.create({
          question: q.question,
          options: q.options.map((opt) =>
            this.optionRepo.create({
              text: opt.text,
              isCorrect: opt.isCorrect,
            }),
          ),
        }),
      ),
    });

    return await this.quizRepo.save(quiz);
  }

  async submitQuiz(dto: SubmitQuizDto, userId: string): Promise<QuizResult> {
    const quiz = await this.quizRepo.findOne({
      where: { id: dto.quizId },
      relations: ['questions', 'questions.options'],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${dto.quizId} not found`);
    }

    let score = 0;

    for (const answer of dto.answers) {
      const question = quiz.questions.find((q) => q.id === answer.questionId);

      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found in quiz`,
        );
      }

      const selectedOption = question.options.find(
        (opt) => opt.id === answer.selectedOptionId,
      );

      if (!selectedOption) {
        throw new NotFoundException(
          `Selected option ID ${answer.selectedOptionId} not found for question ${answer.questionId}`,
        );
      }

      if (selectedOption.isCorrect) {
        score++;
      }
    }

    const result = this.resultRepo.create({
      user: { id: userId },
      quiz: { id: dto.quizId },
      score,
    });

    return await this.resultRepo.save(result);
  }

  async findOne(id: string): Promise<Quiz | null> {
    return await this.quizRepo.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }
}
