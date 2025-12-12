import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity()
export class UserProduct {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    config: string

    @Column()
    isEnabled: boolean

    @Column()
    accessToken: string

    @Column()
    refreshToken: string

    @ManyToOne(() => User, (user) => user.userProducts, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Product, (product) => product.userProducts, { onDelete: 'CASCADE' })
    product: Product
}