import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class QuizOptionDto {
  @IsString()
  text: string;

  @IsNotEmpty()
  isCorrect: boolean;
}

class QuizQuestionDto {
  @IsString()
  question: string;

  @IsString()
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizOptionDto)
  options: QuizOptionDto[];
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  courseId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}
