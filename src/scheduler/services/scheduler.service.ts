import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Recurrence } from '../enums/recurrence.enums';
import { Cron } from '@nestjs/schedule';
import { ProductEvent } from '../enums/product-event.enum';

@Injectable()
export class SchedulerService {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    @Cron(Recurrence.EVERY_DAY_AT_MIDNIGHT)
    triggerEveryDaysScripts() {
        this.eventEmitter.emit(ProductEvent.EVERY_DAYS_EVENT);
    }
}
