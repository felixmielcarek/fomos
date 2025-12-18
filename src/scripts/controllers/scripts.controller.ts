import { Controller, Param, Put } from '@nestjs/common';
import { BigBrotherService } from '../services/bigbrother.service';
import { ProductId } from 'src/common/enums/product-id.enum';

@Controller('scripts')
export class ScriptsController {
    constructor(private readonly bigBrotherService: BigBrotherService) {}

    @Put(':productId/run')
    async runProduct(@Param('productId') productId: string) {
        switch (productId) {
            case ProductId.BIGBROTHER.toString():
                await this.bigBrotherService.runScript();
                break;
            default:
                return;
        }
    }
}
