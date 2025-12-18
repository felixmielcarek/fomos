import { Injectable } from '@nestjs/common';
import { ProductId } from 'src/common/enums/product-id.enum';
import { UserProductDto } from 'src/users-products/dtos/user-product.dto';
import { UsersProductsService } from 'src/users-products/services/users-products.service';

@Injectable()
export class ScriptUtilityService {
    constructor(private readonly usersProductsService: UsersProductsService) {}

    async getSubscribers(productId: ProductId): Promise<UserProductDto[]> {
        return await this.usersProductsService.getProductUsers(productId);
    }
}
