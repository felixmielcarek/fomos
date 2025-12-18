import { Controller, Param, Put } from '@nestjs/common';
import { UsersProductsService } from '../services/users-products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('users/:userId/products')
export class UsersProductsController {
    constructor(private readonly usersProductsService: UsersProductsService) {}

    @Roles(Role.ADMIN)
    @Put(':productId/disable')
    disableProduct(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.usersProductsService.disableProduct(userId, productId);
    }
}
