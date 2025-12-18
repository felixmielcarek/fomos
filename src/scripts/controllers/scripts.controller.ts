import { Controller, Param, Put } from '@nestjs/common';
import { BigBrotherService } from '../services/bigbrother.service';
import { ProductId } from 'src/common/enums/product-id.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('scripts')
export class ScriptsController {
    constructor(private readonly bigBrotherService: BigBrotherService) {}

    @Roles(Role.ADMIN)
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
