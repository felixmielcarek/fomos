import { Module } from '@nestjs/common';
import { UsersProductsController } from './controllers/users-products.controller';
import { UsersProductsService } from './services/users-products.service';
import { UserProduct } from './entities/user-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        UsersModule,
        ProductsModule,
        TypeOrmModule.forFeature([UserProduct]),
    ],
    controllers: [UsersProductsController],
    providers: [UsersProductsService],
    exports: [UsersProductsService],
})
export class UsersProductsModule {}
