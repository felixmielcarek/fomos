import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('users_roles')
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userRoles, {
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Role, (role) => role.userRoles, {
        onDelete: 'CASCADE',
    })
    role: Role;
}
