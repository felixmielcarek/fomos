import { Test, TestingModule } from '@nestjs/testing';
import { ScriptUtilityService } from './script-utility.service';

describe('ScriptsService', () => {
  let service: ScriptUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptUtilityService],
    }).compile();

    service = module.get<ScriptUtilityService>(ScriptUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
