import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SubmitQuizDto {
  @IsString()
  quizId: string;

  @IsArray()
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}
