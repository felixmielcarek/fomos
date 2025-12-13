import { Controller, Get, Param, Put, Query, Body, UseGuards } from '@nestjs/common';
import { UsersProductsService } from '../service/users-products.service';
import { UserProductDto } from 'src/users-products/dtos/user-product.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users/:userId/products')
export class UsersProductsController {
    constructor(private readonly usersProductsService: UsersProductsService) {}

    @UseGuards(AuthGuard)
    @Get()
    getUserProducts(@Param('userId') userId: string): UserProductDto[] {
        return this.usersProductsService.getUserProducts()
    }

    @UseGuards(AuthGuard)
    @Put(':productId/disable')
    disableProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
        return this.usersProductsService.disableProduct(userId, productId)
    }
    
    @UseGuards(AuthGuard)
    @Put(":productId/configure")
    configureProduct(@Param() params: any, @Query('userId') userId: string, @Body() config: string){
        return
    }
}
