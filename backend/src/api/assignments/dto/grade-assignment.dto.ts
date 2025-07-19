import { IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';

export class GradeAssignmentDto {
  @IsUUID()
  submissionId: string;

  @IsNumber()
  grade: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
