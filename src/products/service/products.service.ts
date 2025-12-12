import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/products/models/product.models';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scope } from '../entities/scope.entity';
import { ProductScope } from '../entities/product-scope.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) 
        private readonly productsRepository: Repository<Product>,

        @InjectRepository(Scope) 
        private readonly scopeRepository: Repository<Scope>,

        @InjectRepository(ProductScope) 
        private readonly productScopeRepository: Repository<ProductScope>,
    ){}
    
    getProducts(): ProductDto[] {
        return []
    }

    async createProduct(productDto: ProductDto) {
        const { clientId, redirectUri, scope } = productDto;
        
        try {
            const product = this.productsRepository.create({clientId, redirectUri})
            await this.productsRepository.save(product)

            for (const s of scope) {
                let existingScope = await this.scopeRepository.findOne({ where: { name: s }})

                if (!existingScope) {
                    existingScope = this.scopeRepository.create({ name: s })
                    await this.scopeRepository.save(existingScope)
                }

                const productScope = this.productScopeRepository.create({ product: product, scope: existingScope })
                await this.productScopeRepository.save(productScope);
                
            }
        } catch (error) {
            throw error
        }
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
