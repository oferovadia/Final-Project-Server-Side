// eslint-disable-next-line prettier/prettier
import { Max, Min } from "class-validator";
import { Customers } from 'src/customer/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(1)
  @Max(1000)
  price: number;

  @ManyToOne(() => Customers, (cust) => cust.orders)
  customer: Customers;
}
