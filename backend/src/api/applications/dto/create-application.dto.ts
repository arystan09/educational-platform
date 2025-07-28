import { IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsNumber()
  courseId: string;
}
