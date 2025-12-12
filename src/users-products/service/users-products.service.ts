import { Injectable } from '@nestjs/common';
import { UserProductDto } from 'src/users-products/models/user-product.models';
import { UserProduct } from '../entities/user-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UsersProductsService {
    constructor(
        @InjectRepository(UserProduct) 
        private readonly usersProductsRepository: Repository<UserProduct>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ){}
    

    getUserProducts(): UserProductDto[] {
        return []
    }

    async createUserProduct(userId:string, clientId:string, accessToken:string, refreshToken:string) {
        try {
            const user = await this.usersRepository.findOneBy({ userId })
            const product = await this.productsRepository.findOneBy({ clientId })
            if(user===null || product===null) return

            const userProduct = this.usersProductsRepository.create({
                config: '',
                isEnabled: true,
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
                product: product
            })
            await this.usersProductsRepository.save(userProduct)
        } catch (error) {
            throw(error)
        }
    }

    async enableProduct(userId: string, clientId: string) {
        return
    }

    disableProduct(userId: string, clientId: string) {
        return
    }
}
