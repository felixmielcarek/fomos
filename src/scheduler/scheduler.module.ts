import { Module } from '@nestjs/common';
import { SchedulerService } from './services/scheduler.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
    providers: [SchedulerService, EventEmitter2],
})
export class SchedulerModule {}
