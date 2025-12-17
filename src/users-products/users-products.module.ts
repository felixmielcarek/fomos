import { Module } from '@nestjs/common';
import { UsersProductsController } from './controller/users-products.controller';
import { UsersProductsService } from './service/users-products.service';
import { UserProduct } from './entities/user-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserProduct]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [UsersProductsController],
    providers: [UsersProductsService],
    exports: [UsersProductsService],
})
export class UsersProductsModule {}
