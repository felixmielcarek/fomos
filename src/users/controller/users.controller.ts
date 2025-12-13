import { Controller, Post, Request, Put, Delete, Body, Param, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import type { UserDto } from 'src/users/dtos/user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(AuthGuard)
    @Get(":userId")
    async getUser(@Param('userId') userId: string): Promise<UserDto | null> {
        return await this.usersService.getUser(userId)
    }

    @Post('signin')
    async createUser(@Body() user: UserDto){
        return await this.usersService.createUser(user)
    }

    @UseGuards(AuthGuard)
    @Delete(":userId")
    async deleteUser(@Param('userId') userId: string){
        return await this.usersService.deleteUser(userId)
    }
}
