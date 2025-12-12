import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyUtilsController } from './spotify-utils.controller';

describe('SpotifyUtilsController', () => {
  let controller: SpotifyUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyUtilsController],
    }).compile();

    controller = module.get<SpotifyUtilsController>(SpotifyUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
