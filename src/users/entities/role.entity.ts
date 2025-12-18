import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('roles')
export class Role {
    @PrimaryColumn()
    name: string;

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles: UserRole[];
}
