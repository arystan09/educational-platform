import { Test, TestingModule } from '@nestjs/testing';
import { AdminRequestsController } from './admin-requests.controller';

describe('AdminRequestsController', () => {
  let controller: AdminRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminRequestsController],
    }).compile();

    controller = module.get<AdminRequestsController>(AdminRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
