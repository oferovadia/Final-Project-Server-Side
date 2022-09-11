import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Categories } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photos } from './photos.entity';
import { Products } from './product.entity';

@Entity()
export class Product_Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 15,
  })
  size: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  units_in_stock: number;

  @Column({
    nullable: false,
    type: 'double',
  })
  unit_price: number;

  @ManyToOne(() => Products, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Products[];
}
