import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ProductScope } from "./product-scope.entity";
import { UserProduct } from "src/users-products/entities/user-product.entity";

@Entity('products')
export class Product {
    @PrimaryColumn()
    clientId: string

    @Column()
    clientSecret: string

    @Column()
    redirectUri: string

    @OneToMany(() => ProductScope, (productScope) => productScope.product)
    productScopes: ProductScope[]

    @OneToMany(() => UserProduct, (userProduct) => userProduct.product)
    userProducts: UserProduct[];
}