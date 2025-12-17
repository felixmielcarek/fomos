import { Injectable } from '@nestjs/common';
import { ScriptUtilityService } from './script-utility.service';
import { ScriptService } from './script.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductsEvents } from 'src/scheduler/enums/products-events.enum';

@Injectable()
export class BigBrotherService implements ScriptService {
    constructor(private readonly scriptUtility: ScriptUtilityService) { }

    @OnEvent(ProductsEvents.BIGBROTHER_EVENT)
    handleEvent() {
        this.scriptUtility.runScriptForAllUsers('')
    }

    runScript() {
        return;
    }

    /*configureProduct(userId: string, config: string) {
        return;
    }*/
}
