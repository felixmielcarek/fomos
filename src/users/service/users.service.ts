import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/models/user.models';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

    private toDto(entity: User): UserDto {
        return { 
            userId: entity.userId,
            spotifyId: entity.spotifyId,
            userPassword: entity.userPassword
        }
    }

    async getUser(userId: string): Promise<UserDto | null>{
        try {
            const user = await this.usersRepository.findOneBy({userId})
            return user === null ? null : this.toDto(user)
        } catch (error) {
            throw error
        }
    }

    async createUser(userDto: UserDto) {
        try {
            const user = this.usersRepository.create(userDto)
            await this.usersRepository.save(user)
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId: string) {
        try {
            await this.usersRepository.delete(userId)
        } catch (error) {
            throw error
        }
    }
}
