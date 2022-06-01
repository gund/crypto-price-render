import { Test, TestingModule } from '@nestjs/testing';
import { WrapInHtmlService } from './wrap-in-html.service';

describe('WrapInHtmlService', () => {
  let service: WrapInHtmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WrapInHtmlService],
    }).compile();

    service = module.get<WrapInHtmlService>(WrapInHtmlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
