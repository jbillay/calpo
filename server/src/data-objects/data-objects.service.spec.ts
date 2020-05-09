import { Test, TestingModule } from '@nestjs/testing';
import { DataObjectsService } from './data-objects.service';

describe('DataObjectsService', () => {
  let service: DataObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataObjectsService],
    }).compile();

    service = module.get<DataObjectsService>(DataObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
