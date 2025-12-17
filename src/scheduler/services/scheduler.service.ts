import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Recurrences } from '../enums/recurrences.enums';
import { Cron } from '@nestjs/schedule';
import { ProductsEvents } from '../enums/products-events.enum';

@Injectable()
export class SchedulerService {
    constructor(private readonly eventEmitter: EventEmitter2) { }

    @Cron(Recurrences.EVERY_DAY_AT_MIDNIGHT)
    runBigBrother() {
        this.eventEmitter.emit(ProductsEvents.BIGBROTHER_EVENT)
    }

}
