import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from '../types/jwt-auth-payload.type';
import { buildJwtOptionsByKey } from 'src/config/jwt-options.factory';
import { ConfigService } from '@nestjs/config';
import { AuthSession } from '../types/auth-session.type';
import { UserContext } from '../types/user-context.type';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    private async generateTokens(
        userContext: UserContext,
    ): Promise<AuthSession> {
        const payload: JwtAuthPayload = {
            sub: userContext.userId,
            role: userContext.role,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(
                payload,
                buildJwtOptionsByKey(this.configService, 'refreshJwt'),
            ),
        ]);

        return {
            user_id: userContext.userId,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    // check if user credentials are correct
    async validateLogin(
        userId: string,
        userPassword: string,
    ): Promise<UserContext> {
        const userDto = await this.usersService.getUserByUserId(userId);
        if (!userDto)
            throw new UnauthorizedException(`User ${userId} does not exist.`);

        const isPasswordValid = await argon2.verify(
            userDto.userHashedPassword,
            userPassword,
        );
        if (!isPasswordValid)
            throw new UnauthorizedException(
                `Invalid password for user ${userId}.`,
            );

        return { userId: userDto.userId, role: userDto.role };
    }

    // check if refresh token is correct
    async validateRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<UserContext> {
        const userDto = await this.usersService.getUserByUserId(userId);

        if (!userDto || !userDto.hashedRefreshToken)
            throw new UnauthorizedException(`User ${userId} has to login.`);

        const isRefreshTokenValid = await argon2.verify(
            userDto.hashedRefreshToken,
            refreshToken,
        );
        if (!isRefreshTokenValid)
            throw new UnauthorizedException(
                `Invalid refresh token for user ${userId}.`,
            );

        return { userId: userDto.userId, role: userDto.role };
    }

    async login(userContext: UserContext): Promise<AuthSession> {
        const authSession = await this.generateTokens(userContext);
        const hashedRefreshToken = await argon2.hash(authSession.refresh_token);

        await this.usersService.updateHashedRefreshToken(
            userContext.userId,
            hashedRefreshToken,
        );

        return authSession;
    }

    async logout(userContext: UserContext) {
        await this.usersService.updateHashedRefreshToken(
            userContext.userId,
            null,
        );
    }
}
