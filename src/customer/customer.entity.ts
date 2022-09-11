import { Cart } from 'src/cart/entities/cart.entity';
import { Orders } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  first_name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  last_name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 35,
  })
  email: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 400,
  })
  password: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 25,
  })
  phone: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  country: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  city: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 40,
  })
  address: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 15,
  })
  postal_code: string;

  @OneToMany(() => Orders, (order) => order.customer)
  orders: Orders[];

  @OneToMany(() => Cart, (cart) => cart.customer)
  cart: Cart[];
}
