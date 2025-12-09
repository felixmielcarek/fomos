import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/models/user.models';

@Injectable()
export class UsersService {
    getUsers(): UserDto[]{
        return []
    }

    createUser(user: UserDto) {
        return
    }

    updateUser(user: UserDto) {
        return
    }

    deleteUser(id: string) {
        return
    }
}
