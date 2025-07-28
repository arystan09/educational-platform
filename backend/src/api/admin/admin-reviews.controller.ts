import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('admin/reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get('pending')
  getPending() {
    return this.reviewService.findPending();
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.reviewService.approve(id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.reviewService.reject(id);
  }
}
