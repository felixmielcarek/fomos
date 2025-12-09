import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ScriptsService } from 'src/scripts/scripts.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ScriptsService],
})
export class ProductsModule {}
