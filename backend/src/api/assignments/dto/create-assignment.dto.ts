import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID()
  courseId: string;

  @IsDateString()
  dueDate: string;
}
