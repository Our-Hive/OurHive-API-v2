import { Test, TestingModule } from '@nestjs/testing';
import { RecordDeController } from './record-de.controller';

describe('RecordDeController', () => {
  let controller: RecordDeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordDeController],
    }).compile();

    controller = module.get<RecordDeController>(RecordDeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
