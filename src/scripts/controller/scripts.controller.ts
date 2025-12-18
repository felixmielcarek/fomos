import { Controller, Param, Put } from '@nestjs/common';
import { BigBrotherService } from '../service/bigbrother.service';
import { ProductsIds } from 'src/products/enums/products-ids.enum';

@Controller('scripts')
export class ScriptsController {
    constructor(private readonly bigBrotherService: BigBrotherService) {}

    @Put(':productId/run')
    async runProduct(@Param('productId') productId: string) {
        switch (productId) {
            case ProductsIds.BIGBROTHER.toString():
                await this.bigBrotherService.runScript();
                break;
            default:
                return;
        }
    }
}
