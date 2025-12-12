import { Controller, Get, Put, Param, Body, Post } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ScriptsService } from 'src/scripts/service/scripts.service';
import type { ProductDto } from 'src/products/models/product.models';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService, 
        private readonly scriptsService: ScriptsService){}

    @Get()
    getProducts(): ProductDto[] {
        return this.productsService.getProducts()
    }

    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product)
    }

    @Put(":id")
    updateProduct(@Param('product') product: ProductDto) {
        return this.productsService.updateProduct(product)
    }

    @Put(":id/run")
    runProduct(@Param() params: any){
        return this.scriptsService.runScriptForAllUsers(params.id)
    }
}
