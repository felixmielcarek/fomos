import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    private toDto(entity: User): UserDto {
        return {
            userId: entity.userId,
            spotifyId: entity.spotifyId,
            userPassword: entity.userPassword,
            role: entity.role,
        };
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }

    async getUserByUserId(userId: string): Promise<UserDto | null> {
        const user = await this.usersRepository.findOneBy({ userId });
        return !user ? null : this.toDto(user);
    }

    async getUserBySpotifyId(spotifyId: string): Promise<UserDto | null> {
        const user = await this.usersRepository.findOneBy({ spotifyId });
        return !user ? null : this.toDto(user);
    }

    async createUser(userDto: UserDto) {
        const userHashedPassword = await this.hashPassword(
            userDto.userPassword,
        );

        const user = this.usersRepository.create({
            ...userDto,
            userPassword: userHashedPassword,
        });
        await this.usersRepository.save(user);
    }

    async deleteUser(userId: string) {
        await this.usersRepository.delete(userId);
    }
}
