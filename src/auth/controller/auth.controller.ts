import { Body, Controller, Post } from '@nestjs/common';
import type { AuthBodyDto } from '../dtos/auth-body.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() authBody: AuthBodyDto) {
        return await this.authService.login(authBody);
    }
}
