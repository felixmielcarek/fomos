import { Injectable } from '@nestjs/common';
import { UserProductDto } from 'src/models/user-product.models';

@Injectable()
export class UsersProductsService {

    getUserProducts(): UserProductDto[] {
        return []
    }

    enableProduct(userId: string, productId: string) {
        return
    }

    disableProduct(userId: string, productId: string) {
        return
    }
}
