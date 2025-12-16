import { Module } from '@nestjs/common';
import { ScriptsService } from './service/scripts.service';

@Module({
    providers: [ScriptsService],
    exports: [ScriptsService],
})
export class ScriptsModule {}
