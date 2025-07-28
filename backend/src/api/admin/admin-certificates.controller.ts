import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { CertificateService } from '../certificates/certificate.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('admin/certificates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminCertificatesController {
  constructor(private readonly certService: CertificateService) {}

  @Get()
  getAll() {
    return this.certService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certService.remove(id);
  }
}
