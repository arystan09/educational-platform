import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Module({
  providers: [CertificateService],
  exports: [CertificateService], // экспортируем для использования в других модулях
})
export class CertificateModule {}
