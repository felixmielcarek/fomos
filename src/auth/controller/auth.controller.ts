import { Body, Controller, Post } from '@nestjs/common';
import type { AuthBodyDto } from '../models/auth-body.models';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() authBody: AuthBodyDto) {
        return this.authService.login(authBody)
    }

}
