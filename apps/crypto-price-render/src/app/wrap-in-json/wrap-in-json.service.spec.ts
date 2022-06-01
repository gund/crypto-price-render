import { Test, TestingModule } from '@nestjs/testing';
import { WrapInJsonService } from './wrap-in-json.service';

describe('WrapInJsonService', () => {
  let service: WrapInJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WrapInJsonService],
    }).compile();

    service = module.get<WrapInJsonService>(WrapInJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
