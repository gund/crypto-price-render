import { Test, TestingModule } from '@nestjs/testing';
import { RayService } from './ray.service';

describe('RayService', () => {
  let service: RayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RayService],
    }).compile();

    service = module.get<RayService>(RayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
