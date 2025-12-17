import { Module } from '@nestjs/common';
import { SpotifyUtilsService } from './service/spotify-utils.service';
import { SpotifyUtilsController } from './controller/spotify-utils.controller';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from 'src/products/service/products.service';
import { UsersProductsService } from 'src/users-products/service/users-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Scope } from 'src/products/entities/scope.entity';
import { ProductScope } from 'src/products/entities/product-scope.entity';
import { UserProduct } from 'src/users-products/entities/user-product.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([Scope]),
        TypeOrmModule.forFeature([ProductScope]),
        TypeOrmModule.forFeature([UserProduct]),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [SpotifyUtilsController],
    providers: [SpotifyUtilsService, ProductsService, UsersProductsService],
    exports: [SpotifyUtilsService],
})
export class SpotifyUtilsModule {}
