import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SpotifyUtilsModule } from './spotify-utils/spotify-utils.module';
import { ScriptsModule } from './scripts/scripts.module';
import { BigBrotherModule } from './big-brother/big-brother.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProductsModule } from './users-products/users-products.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true }), // env var accessible through all project
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],  // this DI guarantee that ConfigService is instanciated 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '*/**/*.entity{.ts,.js}'],
        synchronize: true,
      })
    }),
    ProductsModule, 
    UsersModule, 
    SpotifyUtilsModule, 
    ScriptsModule, 
    BigBrotherModule, UsersProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
