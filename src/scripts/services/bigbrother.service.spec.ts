import { Test, TestingModule } from '@nestjs/testing';
import { BigBrotherService } from './bigbrother.service';

describe('BigBrotherService', () => {
  let service: BigBrotherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigBrotherService],
    }).compile();

    service = module.get<BigBrotherService>(BigBrotherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
