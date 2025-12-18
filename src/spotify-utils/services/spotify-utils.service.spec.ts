import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyUtilsService } from './spotify-utils.service';

describe('SpotifyDataService', () => {
  let service: SpotifyUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyUtilsService],
    }).compile();

    service = module.get<SpotifyUtilsService>(SpotifyUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
