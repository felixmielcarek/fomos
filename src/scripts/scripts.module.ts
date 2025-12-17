import { Module } from '@nestjs/common';
import { ScriptUtilityService } from './service/script-utility.service';
import { BigBrotherService } from './service/bigbrother.service';

@Module({
    providers: [ScriptUtilityService, BigBrotherService],
    exports: [ScriptUtilityService, BigBrotherService],
})
export class ScriptsModule { }
