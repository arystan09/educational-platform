import { IsInt } from 'class-validator';

export class MarkCompleteDto {
  @IsInt()
  chapterId: number;
}
