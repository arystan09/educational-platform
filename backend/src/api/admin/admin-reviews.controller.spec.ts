import { Test, TestingModule } from '@nestjs/testing';
import { AdminReviewsController } from './admin-reviews.controller';

describe('AdminReviewsController', () => {
  let controller: AdminReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminReviewsController],
    }).compile();

    controller = module.get<AdminReviewsController>(AdminReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
