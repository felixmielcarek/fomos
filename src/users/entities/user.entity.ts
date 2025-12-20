import { Role } from 'src/common/enums/roles.enum';
import { UserProduct } from 'src/users-products/entities/user-product.entity';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

@Index('IDX_SPOTIFYID_UNIQUE', ['spotifyId'], {
    unique: true,
    where: `"spotifyId" IS NOT NULL`,
})
@Entity('users')
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ nullable: true })
    spotifyId: string | null;

    @Column()
    userHashedPassword: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @Column({ nullable: true })
    hashedRefreshToken: string | null;

    @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
    userProducts: UserProduct[];
}
