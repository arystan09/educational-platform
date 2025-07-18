import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}
