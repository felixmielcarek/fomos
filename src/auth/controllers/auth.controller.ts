import { Body, Controller, Post } from '@nestjs/common';
import type { AuthBodyDto } from '../dtos/auth-body.dto';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() authBody: AuthBodyDto) {
        return await this.authService.login(authBody);
    }
}
