import { Module } from '@nestjs/common';
import { UsersProductsController } from './controller/users-products.controller';
import { UsersProductsService } from './service/users-products.service';

@Module({
  controllers: [UsersProductsController],
  providers: [UsersProductsService]
})
export class UsersProductsModule {}
