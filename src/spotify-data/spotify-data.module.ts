import { Module } from '@nestjs/common';
import { SpotifyDataService } from './spotify-data.service';

@Module({
  providers: [SpotifyDataService]
})
export class SpotifyDataModule {}
