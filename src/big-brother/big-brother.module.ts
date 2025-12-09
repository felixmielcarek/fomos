import { Module } from '@nestjs/common';
import { BigBrotherService } from './big-brother.service';

@Module({
  providers: [BigBrotherService]
})
export class BigBrotherModule {}
