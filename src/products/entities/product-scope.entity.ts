import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Scope } from './scope.entity';

@Entity()
export class ProductScope {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.productScopes, {
        onDelete: 'CASCADE',
    })
    product: Product;

    @ManyToOne(() => Scope, (scope) => scope.productScopes, {
        onDelete: 'CASCADE',
    })
    scope: Scope;
}
