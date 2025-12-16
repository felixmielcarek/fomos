import { Module } from '@nestjs/common';
import { BigBrotherService } from './service/big-brother.service';

@Module({
    providers: [BigBrotherService],
})
export class BigBrotherModule {}
