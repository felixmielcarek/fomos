import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { ScriptsService } from 'src/scripts/service/scripts.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ScriptsService],
})
export class ProductsModule {}
