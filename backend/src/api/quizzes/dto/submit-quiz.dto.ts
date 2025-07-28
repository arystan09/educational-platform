import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitQuizDto {
  @IsNumber()
  quizId: string;

  @IsArray()
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}
