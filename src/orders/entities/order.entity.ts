// eslint-disable-next-line prettier/prettier
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Customers } from 'src/customer/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order_Details } from './orderDetails.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'date',
  })
  order_date: Date;

  @Column({
    nullable: false,
    type: 'date',
  })
  required_date: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  shipped_date: Date;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  country: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  city: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 40,
  })
  address: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 15,
  })
  postal_code: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 25,
  })
  phone: string;

  @ManyToOne(() => Customers, (cust) => cust.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;

  @OneToMany(() => Order_Details, (orderDetails) => orderDetails.order)
  orderDetails: Order_Details;
}
