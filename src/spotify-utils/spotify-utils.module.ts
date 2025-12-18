import { Module } from '@nestjs/common';
import { SpotifyUtilsService } from './service/spotify-utils.service';
import { SpotifyUtilsController } from './controller/spotify-utils.controller';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from 'src/products/products.module';
import { UsersProductsModule } from 'src/users-products/users-products.module';

@Module({
    imports: [
        HttpModule,
        ProductsModule,
        UsersProductsModule
    ],
    controllers: [SpotifyUtilsController],
    providers: [SpotifyUtilsService],
    exports: [SpotifyUtilsService],
})
export class SpotifyUtilsModule { }
