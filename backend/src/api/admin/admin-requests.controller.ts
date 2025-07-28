import {
  Controller, Get, Patch, Param, UseGuards
} from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('admin/requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminRequestsController {
  constructor(private readonly requestService: EnrollmentService) {}

  @Get()
  getAll() {
    return this.requestService.findAll();
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.requestService.approve(id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.requestService.reject(id);
  }
}
