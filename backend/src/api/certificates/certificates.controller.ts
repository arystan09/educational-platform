import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('certificates')
@UseGuards(JwtAuthGuard)
export class CertificatesController {
  constructor(private readonly certificatesService: CertificateService) {}

  @Get()
  async getUserCertificates(@Req() req: any) {
    const userId = req.user.sub;
    return this.certificatesService.getUserCertificates(userId);
  }
} 