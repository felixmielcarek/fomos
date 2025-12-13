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
        private readonly scopesRepository: Repository<Scope>,

        @InjectRepository(ProductScope) 
        private readonly productsScopesRepository: Repository<ProductScope>,
    ){}

    private toDto(entity: Product): ProductDto {
        return {
            productId: entity.productId,
            clientId: entity.clientId,
            clientSecret: entity.clientSecret,
            redirectUri: entity.redirectUri,
            scopes: entity.productScopes.map(ps => ps.scope.name) || []
        }
    }

    private toDtos(entities: Product[]): ProductDto[] {
        let dtos: ProductDto[] = []
        for(const e of entities) {
            dtos.push(this.toDto(e))
        }
        return dtos
    }

    async getProduct(productId: string): Promise<ProductDto | null>{
        try {
            const product = await this.productsRepository.findOne({
                where: { productId: productId },
                relations: ['productScopes', 'productScopes.scope']
            })
            return !product ? null : this.toDto(product)
        } catch (error) {
            throw error
        }
    }
    
    async getProducts(): Promise<ProductDto[]>{
        try {
            const products = await this.productsRepository.find({ relations: ['productScopes', 'productScopes.scope'] })
            return !products ? [] : this.toDtos(products)
        } catch (error) {
            throw error
        }
    }

    async createProduct(productDto: ProductDto) {
        const { productId, clientId, clientSecret, redirectUri, scopes: scopes } = productDto;
        
        try {
            const product = this.productsRepository.create({productId, clientId, clientSecret, redirectUri})
            await this.productsRepository.save(product)

            for (const s of scopes) {
                let existingScope = await this.scopesRepository.findOne({ where: { name: s }})

                if (!existingScope) {
                    existingScope = this.scopesRepository.create({ name: s })
                    await this.scopesRepository.save(existingScope)
                }

                const productScope = this.productsScopesRepository.create({ product: product, scope: existingScope })
                await this.productsScopesRepository.save(productScope);
                
            }
        } catch (error) {
            throw error
        }
    }
}
