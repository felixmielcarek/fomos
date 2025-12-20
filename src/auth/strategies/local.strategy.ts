import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserContext } from '../types/user-context.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(userId: string, userPassword: string): Promise<UserContext> {
        return await this.authService.validateLogin(userId, userPassword);
    }
}
