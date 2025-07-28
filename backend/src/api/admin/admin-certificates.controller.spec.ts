import { Test, TestingModule } from '@nestjs/testing';
import { AdminCertificatesController } from './admin-certificates.controller';

describe('AdminCertificatesController', () => {
  let controller: AdminCertificatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCertificatesController],
    }).compile();

    controller = module.get<AdminCertificatesController>(AdminCertificatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
