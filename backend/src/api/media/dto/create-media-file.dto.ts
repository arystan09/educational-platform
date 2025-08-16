import { IsString, IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { MediaType } from '../entities/media-file.entity';

export class CreateMediaFileDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsString()
  url: string;

  @IsNumber()
  size: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsUUID()
  chapterId?: string;
} 