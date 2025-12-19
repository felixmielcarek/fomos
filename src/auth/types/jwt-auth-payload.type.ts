import { Role } from 'src/common/enums/roles.enum';

export type JwtAuthPayload = {
    sub: string;
    role: Role;
};
