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
    // Create the quiz first
    const quiz = this.quizRepo.create({
      title: dto.title,
      description: dto.description,
      course: { id: dto.courseId },
    });

    // Save the quiz to get the ID
    const savedQuiz = await this.quizRepo.save(quiz);

    // Create questions and options
    for (const questionDto of dto.questions) {
      const question = this.questionRepo.create({
        question: questionDto.question,
        type: questionDto.type,
        quiz: savedQuiz,
      });

      const savedQuestion = await this.questionRepo.save(question);

      // Create options for this question
      for (const optionDto of questionDto.options) {
        const option = this.optionRepo.create({
          text: optionDto.text,
          isCorrect: optionDto.isCorrect,
          question: savedQuestion,
        });

        await this.optionRepo.save(option);
      }
    }

    // Return the quiz with all relations
    const result = await this.findOne(savedQuiz.id);
    if (!result) {
      throw new NotFoundException('Failed to create quiz');
    }
    return result;
  }

  async submitQuiz(dto: SubmitQuizDto, userId: string): Promise<any> {
    console.log('🔍 submitQuiz called with:', { dto, userId });
    
    const quiz = await this.quizRepo.findOne({
      where: { id: dto.quizId },
      relations: ['questions', 'questions.options'],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${dto.quizId} not found`);
    }

    console.log('✅ Found quiz:', quiz.id);

    let score = 0;
    const results: Array<{
      questionId: string;
      question: string;
      selectedOption: string;
      correctOption: string | undefined;
      isCorrect: boolean;
    }> = [];

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

      const isCorrect = selectedOption.isCorrect;
      if (isCorrect) {
        score++;
      }

      results.push({
        questionId: question.id,
        question: question.question,
        selectedOption: selectedOption.text,
        correctOption: question.options.find(opt => opt.isCorrect)?.text,
        isCorrect: isCorrect
      });
    }

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const result = this.resultRepo.create({
      score: score,
    });
    
    // Set the relationships manually
    result.user = { id: userId } as any;
    result.quiz = { id: dto.quizId } as any;
    result.userId = userId;
    result.quizId = dto.quizId;

    const savedResult = await this.resultRepo.save(result);

    return {
      result: savedResult,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      details: results
    };
  }

  async findOne(id: string): Promise<Quiz | null> {
    return await this.quizRepo.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }

  async getQuizzesForCourse(courseId: string): Promise<Quiz[]> {
    return this.quizRepo.find({
      where: { course: { id: courseId } },
      relations: ['questions', 'questions.options'],
    });
  }

  async update(id: string, updateQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    // Delete existing quiz results first
    await this.resultRepo.delete({ quizId: id });

    // Update quiz
    quiz.title = updateQuizDto.title;
    quiz.description = updateQuizDto.description;
    await this.quizRepo.save(quiz);

    // Create new questions and options
    for (const questionDto of updateQuizDto.questions) {
      const question = this.questionRepo.create({
        question: questionDto.question,
        type: questionDto.type,
        quiz: quiz,
      });
      const savedQuestion = await this.questionRepo.save(question);

      for (const optionDto of questionDto.options) {
        const option = this.optionRepo.create({
          text: optionDto.text,
          isCorrect: optionDto.isCorrect,
          question: savedQuestion,
        });
        await this.optionRepo.save(option);
      }
    }

    const updatedQuiz = await this.findOne(id);
    if (!updatedQuiz) {
      throw new NotFoundException(`Failed to retrieve updated quiz`);
    }
    return updatedQuiz;
  }

  async remove(id: string): Promise<void> {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    await this.quizRepo.remove(quiz);
  }
}
