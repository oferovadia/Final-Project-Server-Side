import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Categories } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './product.entity';

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 300,
  })
  photo_source: string;

  @ManyToOne(() => Products, (product) => product.photos)
  @JoinColumn({ name: 'product_id' })
  product: Products;
}
