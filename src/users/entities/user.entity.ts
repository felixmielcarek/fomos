import { UserProduct } from "src/users-products/entities/user-product.entity";
import { Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    userId: string

    @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
    userProducts: UserProduct[];
}