import { Module } from '@nestjs/common';
import { UsersProductsController } from './users-products.controller';
import { UsersProductsService } from './users-products.service';

@Module({
  controllers: [UsersProductsController],
  providers: [UsersProductsService]
})
export class UsersProductsModule {}
