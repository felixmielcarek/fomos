import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { buildJwtOptionsByKey } from 'src/config/jwt-options.factory';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';

@Module({
    imports: [
        UsersModule,

        PassportModule,

        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                buildJwtOptionsByKey(configService, 'jwt'),
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshJwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AuthModule {}
