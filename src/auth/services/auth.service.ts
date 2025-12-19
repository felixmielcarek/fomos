import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from '../types/jwt-auth-payload.type';
import { UserDto } from 'src/users/dtos/user.dto';
import { buildJwtOptionsByKey } from 'src/config/jwt-options.factory';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(
        userId: string,
        userPassword: string,
    ): Promise<UserDto | null> {
        const user = await this.usersService.getUserByUserId(userId);
        if (!user) return null;

        const isPasswordValid = await compare(userPassword, user.userPassword);
        if (!isPasswordValid) return null;

        return user;
    }

    async login(userDto: UserDto): Promise<{
        user_id: string;
        access_token: string;
        refresh_token: string;
    }> {
        const payload: JwtAuthPayload = {
            sub: userDto.userId,
            role: userDto.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(
            payload,
            buildJwtOptionsByKey(this.configService, 'refreshJwt'),
        );

        return {
            user_id: userDto.userId,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refreshJwt(userDto: UserDto): Promise<{
        user_id: string;
        access_token: string;
    }> {
        const payload: JwtAuthPayload = {
            sub: userDto.userId,
            role: userDto.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            user_id: userDto.userId,
            access_token: accessToken,
        };
    }
}
