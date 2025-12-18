import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from '../types/auth-jwt-payload.type';
import { UserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
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

    async login(
        userDto: UserDto,
    ): Promise<{ user_id: string; access_token: string }> {
        const payload: AuthJwtPayload = { sub: userDto.userId };
        const accessToken = await this.jwtService.signAsync(payload);
        return { user_id: userDto.userId, access_token: accessToken };
    }
}
