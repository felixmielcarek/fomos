import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SpotifyUtilsModule } from './spotify-utils/spotify-utils.module';
import { ScriptsModule } from './scripts/scripts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProductsModule } from './users-products/users-products.module';
import { AuthModule } from './auth/auth.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // env var accessible through all project
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService], // this DI guarantee that ConfigService is instanciated
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [__dirname + '*/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
        }),
        ScheduleModule.forRoot(),
        EventEmitterModule.forRoot(),
        ProductsModule,
        UsersModule,
        SpotifyUtilsModule,
        ScriptsModule,
        UsersProductsModule,
        AuthModule,
        SchedulerModule,
    ],
})
export class AppModule {}
