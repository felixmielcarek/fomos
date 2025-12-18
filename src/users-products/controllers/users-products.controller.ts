import { Controller, Param, Put } from '@nestjs/common';
import { UsersProductsService } from '../services/users-products.service';

@Controller('users/:userId/products')
export class UsersProductsController {
    constructor(private readonly usersProductsService: UsersProductsService) {}

    @Put(':productId/disable')
    disableProduct(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.usersProductsService.disableProduct(userId, productId);
    }
}
