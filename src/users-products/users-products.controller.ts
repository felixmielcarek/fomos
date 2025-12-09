import { Controller, Get, Param, Put, Query, Body } from '@nestjs/common';
import { UsersProductsService } from './users-products.service';
import { UserProductDto } from 'src/models/user-product.models';

@Controller('users/:userId/products')
export class UsersProductsController {
    constructor(private readonly usersProductsService: UsersProductsService) {}

    @Get()
    getUserProducts(@Param('userId') userId: string): UserProductDto[] {
        return this.usersProductsService.getUserProducts()
    }

    @Put(':productId/enable')
    enableProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
        return this.usersProductsService.enableProduct(userId, productId)
    }

    @Put(':productId/disable')
    disableProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
        return this.usersProductsService.disableProduct(userId, productId)
    }
    
    @Put(":productId/configure")
    configureProduct(@Param() params: any, @Query('userId') userId: string, @Body('config') config: string){
        return
    }
}
