import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshJwtAuthGuard } from '../guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<{
        user_id: string;
        access_token: string;
        refresh_token: string;
    }> {
        return await this.authService.login(req.user);
    }

    @Public()
    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refreshJwt(@Request() req): Promise<{
        user_id: string;
        access_token: string;
    }> {
        return await this.authService.refreshJwt(req.user);
    }
}
