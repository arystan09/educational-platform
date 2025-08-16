import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateService } from './certificate.service';
import { CertificatesController } from './certificates.controller';
import { Certificate } from './entities/certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate])],
  controllers: [CertificatesController],
  providers: [CertificateService],
  exports: [CertificateService],
})
export class CertificateModule {}
