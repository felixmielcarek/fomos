import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/models/product.models';

@Injectable()
export class ProductsService {
    getProducts(): ProductDto[] {
        return []
    }
    
    createProduct(product: ProductDto) {
        return
    }

    updateProduct(product: ProductDto) {
        return
    }

    getProductClientId(productName: string) {
        return
    }

    getProductScope(productId: string) {
        return
    }

    getProductRedirectUri(productId: string) {
        return
    }
}
