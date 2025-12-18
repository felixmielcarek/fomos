import { Role } from 'src/common/enums/roles.enum';

export type UserDto = {
    userId: string;
    spotifyId: string;
    userPassword: string;
    role: Role;
};
