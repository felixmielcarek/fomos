import { Role } from 'src/common/enums/roles.enum';
import { UserProduct } from 'src/users-products/entities/user-product.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ unique: true })
    spotifyId: string;

    @Column()
    userPassword: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
    userProducts: UserProduct[];
}
