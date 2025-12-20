import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthPayload } from '../types/jwt-auth-payload.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserContext } from '../types/user-context.type';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
    Strategy,
    'refresh-jwt',
) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('refreshJwt.secret'),
            passReqToCallback: true, // to get refresh_token in validate
        });
    }

    // validate if refresh_token correspond to DB
    async validate(
        req: Request,
        payload: JwtAuthPayload,
    ): Promise<UserContext> {
        const userId = payload.sub;
        const refreshToken = req
            .get('authorization')!
            .replace('Bearer', '')
            .trim();

        return await this.authService.validateRefreshToken(
            userId,
            refreshToken,
        );
    }
}
