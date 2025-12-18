import { Controller, Body, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import type { ProductDto } from 'src/products/dtos/product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Roles(Role.ADMIN)
    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product);
    }
}
