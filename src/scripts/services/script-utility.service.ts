import { Injectable } from '@nestjs/common';
import { ProductsIds } from 'src/products/enums/products-ids.enum';
import { UserProductDto } from 'src/users-products/dtos/user-product.dto';
import { UsersProductsService } from 'src/users-products/services/users-products.service';

@Injectable()
export class ScriptUtilityService {
    constructor(private readonly usersProductsService: UsersProductsService) {}

    async getSubscribers(productId: ProductsIds): Promise<UserProductDto[]> {
        return await this.usersProductsService.getProductUsers(productId);
    }
}
