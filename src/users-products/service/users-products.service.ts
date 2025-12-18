import { Injectable } from '@nestjs/common';
import { UserProductDto } from 'src/users-products/dtos/user-product.dto';
import { UserProduct } from '../entities/user-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsIds } from 'src/products/enums/products-ids.enum';
import { UsersService } from 'src/users/service/users.service';
import { ProductsService } from 'src/products/service/products.service';

@Injectable()
export class UsersProductsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,

        @InjectRepository(UserProduct)
        private readonly usersProductsRepository: Repository<UserProduct>,
    ) {}

    getUserProducts(): UserProductDto[] {
        return [];
    }

    private toDto(entity: UserProduct): UserProductDto {
        return {
            id: entity.id,
            userId: entity.user.userId,
            productId: entity.product.productId,
            isEnabled: entity.isEnabled,
            config: entity.config,
            accessToken: entity.accessToken,
            refreshToken: entity.refreshToken,
        };
    }

    private toDtos(entities: UserProduct[]): UserProductDto[] {
        const dtos: UserProductDto[] = [];
        for (const e of entities) {
            dtos.push(this.toDto(e));
        }
        return dtos;
    }

    async getProductUsers(productId: ProductsIds): Promise<UserProductDto[]> {
        return this.toDtos(
            await this.usersProductsRepository.find({
                where: {
                    isEnabled: true,
                    product: {
                        productId: productId,
                    },
                },
                relations: {
                    user: true,
                    product: true,
                },
            }),
        );
    }

    async setTokens(id: number, updates: Partial<UserProduct>) {
        const userProduct = await this.usersProductsRepository.findOneBy({
            id,
        });

        if (!userProduct) return;

        Object.assign(userProduct, updates);

        await this.usersProductsRepository.save(userProduct);
    }

    async createUserProductFromSpotifyId(
        spotifyId: string,
        productId: string,
        accessToken: string,
        refreshToken: string,
    ) {
        const user = await this.usersService.getUserBySpotifyId(spotifyId);
        const product = await this.productsService.getProduct(productId, false);
        if (!user || !product) return;

        const userProduct = this.usersProductsRepository.create({
            config: '',
            isEnabled: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
            product: product,
        });
        await this.usersProductsRepository.save(userProduct);
    }

    async enableProduct(userId: string, clientId: string) {
        return;
    }

    async disableProduct(userId: string, clientId: string) {
        return;
    }
}
