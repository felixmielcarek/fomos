import { Controller, Get, Put, Param, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ScriptsService } from 'src/scripts/scripts.service';
import type { ProductDto } from 'src/models/product.models';

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
    createProduct(@Body('product') product: ProductDto) {
        return this.productsService.createProduct(product)
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
