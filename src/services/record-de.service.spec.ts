import { Test, TestingModule } from '@nestjs/testing';
import { RecordDeService } from './record-de.service';

describe('RecordDeService', () => {
  let service: RecordDeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordDeService],
    }).compile();

    service = module.get<RecordDeService>(RecordDeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
