import {
    Controller,
    Get,
    Put,
    Param,
    Body,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ScriptUtilityService } from 'src/scripts/service/script-utility.service';
import type { ProductDto } from 'src/products/dtos/product.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly scriptsService: ScriptUtilityService,
    ) { }

    @Get()
    async getProducts(): Promise<ProductDto[]> {
        return this.productsService.getProducts();
    }

    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product);
    }

    @UseGuards(AuthGuard)
    @Put(':productId/run')
    runProduct(@Param() params: any) {
        return this.scriptsService.runScriptForAllUsers(params.productId);
    }
}
