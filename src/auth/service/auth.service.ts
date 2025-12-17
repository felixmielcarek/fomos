import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { AuthBodyDto } from '../dtos/auth-body.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(authBody: AuthBodyDto) {
        const { userId, userPassword } = authBody;

        const user = await this.userService.getUser(userId);
        if (!user) throw new Error();

        const isPasswordValid = await compare(userPassword, user.userPassword);
        if (!isPasswordValid) throw new Error();

        return {
            access_token: await this.jwtService.signAsync({
                userId: user.userId,
            }),
        };
    }
}
