import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(
        userId: string,
        userPassword: string,
    ): Promise<UserDto | null> {
        return await this.authService.validateUser(userId, userPassword);
    }
}
