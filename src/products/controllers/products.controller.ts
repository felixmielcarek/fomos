import { Controller, Body, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import type { ProductDto } from 'src/products/dtos/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product);
    }
}
