import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../auth/decorators/user-id.decorator';
import { MarkCompleteDto } from './dto/mark-complete.dto';

@Controller('progress')
@UseGuards(AuthGuard('jwt'))
export class ProgressController {
  constructor(private readonly service: ProgressService) {}

  @Post('complete')
  markComplete(@UserId() userId: number, @Body() dto: MarkCompleteDto) {
    return this.service.markComplete(userId, dto.chapterId);
  }

  @Post('complete/:courseId/:chapterId')
  markChapterCompleted(
    @UserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
  ) {
    return this.service.markChapterCompleted(userId, courseId, chapterId);
  }

  @Get('completed/:courseId')
  getCompleted(
    @UserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.service.getCompletedChapters(userId, courseId);
  }

  @Get('percent/:courseId')
  getPercent(
    @UserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.service.getProgressPercent(userId, courseId);
  }

  @Get('certificate/:courseId')
  getCertificate(
    @UserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.service.getCertificate(userId, courseId);
  }
}
