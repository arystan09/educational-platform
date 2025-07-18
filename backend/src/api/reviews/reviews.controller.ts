import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../auth/decorators/user-id.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':courseId')
  createOrUpdate(
    @UserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() dto: CreateReviewDto,
  ) {
    return this.service.createOrUpdate(userId, courseId, dto);
  }

  @Get('course/:courseId')
  getByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.service.findByCourse(courseId);
  }

  @Get('average/:courseId')
  getAverage(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.service.getAverageRating(courseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':courseId')
  delete(
    @UserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.service.delete(userId, courseId);
  }
}
