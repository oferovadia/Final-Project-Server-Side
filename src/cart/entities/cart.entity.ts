import { Customers } from 'src/customer/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart_Details } from './cartDetails.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  customer_id: number;

  @ManyToOne(() => Customers, (customer) => customer.cart, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;

  @OneToMany(() => Cart_Details, (cartDetails) => cartDetails.cart)
  cartDetails: Cart_Details[];
}
