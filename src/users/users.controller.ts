import { Controller, Post, Put, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserDto } from 'src/models/user.models';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(): UserDto[] {
        return this.usersService.getUsers()
    }

    @Post()
    createUser(@Body('user') user: UserDto){
        return this.usersService.createUser(user)
    }
    
    @Put()
    updateUser(@Body('user') user: UserDto){
        return this.usersService.updateUser(user)
    }

    @Delete(":id")
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id)
    }
}
