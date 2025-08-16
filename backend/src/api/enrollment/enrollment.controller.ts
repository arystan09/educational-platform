import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post(':courseId/enroll')
  async enroll(@Param('courseId') courseId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.enrollmentService.enroll(userId, courseId);
  }

  @Get()
  async getUserEnrollments(@Req() req: any) {
    const userId = req.user.sub;
    return this.enrollmentService.getUserEnrollments(userId);
  }
}
