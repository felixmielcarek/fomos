import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/models/user.models';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    private toDto(entity: User): UserDto {
        return { 
            spotifyId: entity.spotifyId
        }
    }

    async getUser(spotifyId: string): Promise<UserDto | null>{
        try {
            const user = await this.userRepository.findOneBy({spotifyId})
            return user == null ? null : this.toDto(user)
        } catch (error) {
            throw error
        }
    }

    async createUser(userDto: UserDto) {
        try {
            const user = this.userRepository.create(userDto)
            await this.userRepository.save(user)
        } catch (error) {
            throw error
        }
    }

    updateUser(userDto: UserDto) {
        return
    }

    deleteUser(id: string) {
        return
    }
}
