import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scope } from './entities/scope.entity';
import { ProductScope } from './entities/product-scope.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([Scope]),
        TypeOrmModule.forFeature([ProductScope])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule { }
