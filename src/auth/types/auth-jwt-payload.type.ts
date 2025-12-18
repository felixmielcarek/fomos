import { Role } from 'src/common/enums/roles.enum';

export type AuthJwtPayload = {
    sub: string;
    role: Role;
};
