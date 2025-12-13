import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/models/user.models';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

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

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 10)
    }

    async getUser(userId: string): Promise<UserDto | null>{
        try {
            const user = await this.usersRepository.findOneBy({userId})
            return !user ? null : this.toDto(user)
        } catch (error) {
            throw error
        }
    }

    async createUser(userDto: UserDto) {
        try {
            const userHashedPassword = await this.hashPassword(userDto.userPassword)
            const user = this.usersRepository.create({ ...userDto, userPassword: userHashedPassword })
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
