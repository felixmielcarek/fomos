import { Product } from "src/products/product.entity";
import { UserProduct } from "src/users-products/user-product.entity";
import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    spotifyId: string

    @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
    userProducts: UserProduct[];
}