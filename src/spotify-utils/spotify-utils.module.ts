import { Module } from '@nestjs/common';
import { SpotifyUtilsService } from './service/spotify-utils.service';
import { SpotifyUtilsController } from './controller/spotify-utils.controller';
import { ProductsModule } from 'src/products/products.module';
import { HttpModule } from '@nestjs/axios';
import { UsersProductsModule } from 'src/users-products/users-products.module';

@Module({
  imports: [ProductsModule, UsersProductsModule, HttpModule],
  providers: [SpotifyUtilsService],
  controllers: [SpotifyUtilsController]
})
export class SpotifyUtilsModule {}
