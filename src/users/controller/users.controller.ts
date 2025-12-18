import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import type { UserDto } from 'src/users/dtos/user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<UserDto | null> {
        return await this.usersService.getUserByUserId(userId);
    }

    @Public()
    @Post('signin')
    async createUser(@Body() user: UserDto) {
        return await this.usersService.createUser(user);
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        return await this.usersService.deleteUser(userId);
    }
}
