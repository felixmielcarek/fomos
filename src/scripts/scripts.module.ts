import { Module } from '@nestjs/common';
import { ScriptUtilityService } from './service/script-utility.service';
import { BigBrotherService } from './service/bigbrother.service';
import { UsersProductsService } from 'src/users-products/service/users-products.service';
import { HttpModule } from '@nestjs/axios';
import { SpotifyUtilsService } from 'src/spotify-utils/service/spotify-utils.service';
import { ProductsService } from 'src/products/service/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProduct } from 'src/users-products/entities/user-product.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Scope } from 'src/products/entities/scope.entity';
import { ProductScope } from 'src/products/entities/product-scope.entity';
import { ProductsModule } from 'src/products/products.module';
import { SpotifyUtilsModule } from 'src/spotify-utils/spotify-utils.module';
import { UsersProductsModule } from 'src/users-products/users-products.module';
import { ScriptsController } from './controller/scripts.controller';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([UserProduct]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([Scope]),
        TypeOrmModule.forFeature([ProductScope]),
        ProductsModule,
        SpotifyUtilsModule,
        UsersProductsModule
    ],
    controllers: [ScriptsController],
    providers: [
        BigBrotherService,
        ScriptUtilityService,
    ]
})
export class ScriptsModule { }
