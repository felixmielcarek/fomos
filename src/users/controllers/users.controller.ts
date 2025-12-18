import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import type { UserDto } from 'src/users/dtos/user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.ADMIN)
    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<UserDto | null> {
        return await this.usersService.getUserByUserId(userId);
    }

    @Public()
    @Post('signin')
    async createUser(@Body() user: UserDto) {
        return await this.usersService.createUser(user);
    }

    @Roles(Role.ADMIN)
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        return await this.usersService.deleteUser(userId);
    }
}
