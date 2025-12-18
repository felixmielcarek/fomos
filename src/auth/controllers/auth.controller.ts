import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
//import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //@Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }
}
