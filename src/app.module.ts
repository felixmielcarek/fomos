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
import * as Joi from 'joi';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { buildDatabaseOptions } from './config/database-options.factory';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // automatically import ConfigModule in every module
            load: [databaseConfig, jwtConfig],
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required(),
                REFRESH_JWT_SECRET: Joi.string().required(),
                REFRESH_JWT_EXPIRES_IN: Joi.string().required(),
            }),
        }),

        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                buildDatabaseOptions(configService),
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
