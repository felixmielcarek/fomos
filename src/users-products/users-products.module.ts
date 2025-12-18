import { Module } from '@nestjs/common';
import { UsersProductsController } from './controller/users-products.controller';
import { UsersProductsService } from './service/users-products.service';
import { UserProduct } from './entities/user-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        UsersModule,
        ProductsModule,
        TypeOrmModule.forFeature([UserProduct]),
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [UsersProductsController],
    providers: [UsersProductsService],
    exports: [UsersProductsService],
})
export class UsersProductsModule {}
