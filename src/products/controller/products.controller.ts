import {
    Controller,
    Get,
    Body,
    Post,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import type { ProductDto } from 'src/products/dtos/product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    @Get()
    async getProducts(): Promise<ProductDto[]> {
        return this.productsService.getProducts();
    }

    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product);
    }
}
