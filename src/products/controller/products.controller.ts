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
import type { ProductDto } from 'src/products/dtos/product.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ProductsIds } from '../enums/products-ids.enum';
import { BigBrotherService } from 'src/scripts/service/bigbrother.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly bigBrotherService: BigBrotherService,
    ) {}

    @Get()
    async getProducts(): Promise<ProductDto[]> {
        return this.productsService.getProducts();
    }

    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product);
    }

    //@UseGuards(AuthGuard)
    @Put(':productId/run')
    async runProduct(@Param('productId') productId: string) {
        if (productId === ProductsIds.BIGBROTHER.toString())
            await this.bigBrotherService.runScript();
    }
}
