import { Controller, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ScriptsService } from 'src/scripts/service/scripts.service';
import type { ProductDto } from 'src/products/dtos/product.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService, 
        private readonly scriptsService: ScriptsService){}

    @Get()
    async getProducts(): Promise<ProductDto[]> {
        return this.productsService.getProducts()
    }

    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Body() product: ProductDto) {
        return await this.productsService.createProduct(product)
    }
    
    @UseGuards(AuthGuard)
    @Put(":productId/run")
    runProduct(@Param() params: any){
        return this.scriptsService.runScriptForAllUsers(params.productId)
    }
}
