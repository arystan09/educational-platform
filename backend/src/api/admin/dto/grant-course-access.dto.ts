import { IsUUID } from 'class-validator';

export class GrantCourseAccessDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  courseId: string;
}
