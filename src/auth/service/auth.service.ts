import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { AuthBodyDto } from '../models/auth-body.models';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService){}

    async login(authBody: AuthBodyDto) {
        const {userId, userPassword} = authBody

        const user = await this.userService.getUser(userId)
        if(!user) throw new Error

        const isPasswordValid = await compare(userPassword, user.userPassword)
        if(!isPasswordValid) throw new Error

        return
    }
}
