import { UserProduct } from 'src/users-products/entities/user-product.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('users')
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ unique: true })
    spotifyId: string;

    @Column()
    userPassword: string;

    @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
    userProducts: UserProduct[];

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles: UserRole[];
}
