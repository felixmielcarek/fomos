import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scope } from './entities/scope.entity';
import { ProductScope } from './entities/product-scope.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BigBrotherService } from 'src/scripts/service/bigbrother.service';
import { ScriptUtilityService } from 'src/scripts/service/script-utility.service';
import { SpotifyUtilsService } from 'src/spotify-utils/service/spotify-utils.service';
import { HttpModule } from '@nestjs/axios';
import { UsersProductsService } from 'src/users-products/service/users-products.service';
import { User } from 'src/users/entities/user.entity';
import { UserProduct } from 'src/users-products/entities/user-product.entity';

@Module({
    imports: [
        HttpModule,
        AuthModule,
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([Scope]),
        TypeOrmModule.forFeature([ProductScope]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([UserProduct]),
    ],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        BigBrotherService,
        ScriptUtilityService,
        UsersProductsService,
        SpotifyUtilsService,
    ],
    exports: [ProductsService],
})
export class ProductsModule {}
