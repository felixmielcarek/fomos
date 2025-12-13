import { Controller, Post, Request, Put, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import type { UserDto } from 'src/users/models/user.models';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get(":userId")
    async getUser(@Param('userId') userId: string): Promise<UserDto | null> {
        return await this.usersService.getUser(userId)
    }

    @Post()
    async createUser(@Body() user: UserDto){
        return await this.usersService.createUser(user)
    }

    @Delete(":userId")
    async deleteUser(@Param('userId') userId: string){
        return await this.usersService.deleteUser(userId)
    }
}
