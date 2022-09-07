// eslint-disable-next-line prettier/prettier
import { Max, Min } from "class-validator";
import { Customer } from 'src/customer/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(1)
  @Max(1000)
  price: number;

  @ManyToOne(() => Customer, (cust) => cust.orders)
  customer: Customer;
}
