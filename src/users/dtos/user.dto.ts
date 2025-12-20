import { Role } from 'src/common/enums/roles.enum';

export type UserDto = {
    userId: string;
    spotifyId: string | null;
    userHashedPassword: string;
    role: Role;
    hashedRefreshToken: string | null;
};
