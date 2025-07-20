import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { DateRangeDto } from './dto/date-range.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('users')
  getUserStats(@Query() range: DateRangeDto) {
    return this.analyticsService.getUserStats(range);
  }

  @Get('courses')
  getCourseStats(@Query() range: DateRangeDto) {
    return this.analyticsService.getCourseStats(range);
  }

  @Get('quizzes')
  getQuizStats(@Query() range: DateRangeDto) {
    return this.analyticsService.getQuizStats(range);
  }

  @Get('certificates')
  getCertificateStats(@Query() range: DateRangeDto) {
    return this.analyticsService.getCertificateStats(range);
  }

  @Get('assignments')
  getAssignmentStats(@Query() range: DateRangeDto) {
    return this.analyticsService.getAssignmentStats(range);
  }
}
