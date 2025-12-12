import { Controller, Post, Request, Put, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import type { UserDto } from 'src/users/models/user.models';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get(":spotifyId")
    async getUser(@Param('spotifyId') spotifyId: string): Promise<UserDto | null> {
        return await this.usersService.getUser(spotifyId)
    }

    @Post()
    async createUser(@Body() user: UserDto){
        return await this.usersService.createUser(user)
    }

    @Delete(":spotifyId")
    async deleteUser(@Param('spotifyId') id: string){
        return await this.usersService.deleteUser(id)
    }
}
