import { Controller, Post, Request, Put, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserDto } from 'src/models/user.models';

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
    
    @Put()
    updateUser(@Body() user: UserDto){
        return this.usersService.updateUser(user)
    }

    @Delete(":spotifyId")
    deleteUser(@Param('spotifyId') id: string){
        return this.usersService.deleteUser(id)
    }
}
