import { Module } from '@nestjs/common';
import { ScriptUtilityService } from './service/script-utility.service';
import { BigBrotherService } from './service/bigbrother.service';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from 'src/products/products.module';
import { SpotifyUtilsModule } from 'src/spotify-utils/spotify-utils.module';
import { UsersProductsModule } from 'src/users-products/users-products.module';
import { ScriptsController } from './controller/scripts.controller';

@Module({
    imports: [
        HttpModule,
        ProductsModule,
        SpotifyUtilsModule,
        UsersProductsModule,
    ],
    controllers: [ScriptsController],
    providers: [BigBrotherService, ScriptUtilityService],
})
export class ScriptsModule {}
