import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitQuizDto {
  @IsNumber()
  quizId: number;

  @IsArray()
  answers: {
    questionId: number;
    selectedOptionId: number;
  }[];
}
