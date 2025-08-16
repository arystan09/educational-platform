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

@Controller('courses/:courseId/reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createOrUpdate(
    @UserId() userId: string,
    @Param('courseId', ParseIntPipe) courseId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.service.createOrUpdate(userId, courseId, dto);
  }

  @Get()
  getByCourse(@Param('courseId', ParseIntPipe) courseId: string) {
    return this.service.findByCourse(courseId);
  }

  @Get('average')
  getAverage(@Param('courseId', ParseIntPipe) courseId: string) {
    return this.service.getAverageRating(courseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(
    @UserId() userId: string,
    @Param('courseId', ParseIntPipe) courseId: string,
  ) {
    return this.service.delete(userId, courseId);
  }
}
