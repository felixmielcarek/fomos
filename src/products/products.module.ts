import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { ScriptsService } from 'src/scripts/service/scripts.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scope } from './entities/scope.entity';
import { ProductScope } from './entities/product-scope.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([Scope]),
        TypeOrmModule.forFeature([ProductScope]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ScriptsService],
    exports: [ProductsService],
})
export class ProductsModule {}
