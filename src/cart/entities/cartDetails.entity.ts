import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Products } from 'src/products/entities/product.entity';

@Entity()
export class Cart_Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 10,
  })
  size: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  quantity: number;

  @Column({
    nullable: true,
    type: 'double',
  })
  total_products_price: number;

  @ManyToOne(() => Products, (product) => product.cartDetails, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @ManyToOne(() => Cart, (cart) => cart.cartDetails)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
