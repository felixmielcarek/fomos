import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductScope } from './product-scope.entity';

@Entity()
export class Scope {
    @PrimaryColumn()
    name: string;

    @OneToMany(() => ProductScope, (productScope) => productScope.scope)
    productScopes: ProductScope[];
}
