import { IsUUID, IsOptional, IsString } from 'class-validator';

export class SubmitAssignmentDto {
  @IsUUID()
  assignmentId: string;

  @IsOptional()
  @IsString()
  textAnswer?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;
}
