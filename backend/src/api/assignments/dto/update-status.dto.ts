import { IsEnum, IsUUID } from 'class-validator';
import { SubmissionStatus } from '../entites/assignment-submission.entity';

export class UpdateStatusDto {
  @IsUUID()
  submissionId: string;

  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;
}
