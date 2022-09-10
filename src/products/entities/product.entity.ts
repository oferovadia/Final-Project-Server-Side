import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  parent_id: number;

//   @ManyToOne(() => Customers, (cust) => cust.orders)
//   @JoinColumn({ name: 'customer_id' })
//   customer: Customers;
}
