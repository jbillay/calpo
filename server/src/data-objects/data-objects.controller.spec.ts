import { Test, TestingModule } from '@nestjs/testing';
import { DataObjectsController } from './data-objects.controller';

describe('DataObjects Controller', () => {
  let controller: DataObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataObjectsController],
    }).compile();

    controller = module.get<DataObjectsController>(DataObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
