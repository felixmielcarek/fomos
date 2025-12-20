import { Role } from 'src/common/enums/roles.enum';

export interface UserContext {
    userId: string;
    role: Role;
}
