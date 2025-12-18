import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/products/dtos/product.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scope } from '../entities/scope.entity';
import { ProductScope } from '../entities/product-scope.entity';
import { ProductId } from '../../common/enums/product-id.enum';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,

        @InjectRepository(Scope)
        private readonly scopesRepository: Repository<Scope>,

        @InjectRepository(ProductScope)
        private readonly productsScopesRepository: Repository<ProductScope>,
    ) {}

    private toDto(entity: Product): ProductDto {
        return {
            productId: entity.productId,
            clientId: entity.clientId,
            clientSecret: entity.clientSecret,
            redirectUri: entity.redirectUri,
            scopes: entity.productScopes.map((ps) => ps.scope.name) || [],
        };
    }

    private toDtos(entities: Product[]): ProductDto[] {
        const dtos: ProductDto[] = [];
        for (const e of entities) {
            dtos.push(this.toDto(e));
        }
        return dtos;
    }

    async getProduct(
        productId: string,
        getRelations: boolean = true,
    ): Promise<ProductDto | null> {
        const product = await this.productsRepository.findOne({
            where: { productId: productId },
            relations: getRelations
                ? ['productScopes', 'productScopes.scope']
                : [],
        });
        return !product ? null : this.toDto(product);
    }

    async getProducts(): Promise<ProductDto[]> {
        const products = await this.productsRepository.find({
            relations: ['productScopes', 'productScopes.scope'],
        });
        return !products ? [] : this.toDtos(products);
    }

    async createProduct(productDto: ProductDto) {
        if (!ProductId[productDto.productId]) return;

        const {
            productId,
            clientId,
            clientSecret,
            redirectUri,
            scopes: scopes,
        } = productDto;

        const product = this.productsRepository.create({
            productId,
            clientId,
            clientSecret,
            redirectUri,
        });
        await this.productsRepository.save(product);

        for (const s of scopes) {
            let existingScope = await this.scopesRepository.findOne({
                where: { name: s },
            });

            if (!existingScope) {
                existingScope = this.scopesRepository.create({ name: s });
                await this.scopesRepository.save(existingScope);
            }

            const productScope = this.productsScopesRepository.create({
                product: product,
                scope: existingScope,
            });
            await this.productsScopesRepository.save(productScope);
        }
    }
}
