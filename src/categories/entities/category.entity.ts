import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Products } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  category_name: string;

  @ManyToOne(() => Categories, (category) => category.childCategories)
  @JoinColumn({ name: 'parent_id' })
  parent_id: Categories;

  @OneToMany(() => Categories, (category) => category.parent_id)
  childCategories: Categories[];

  @OneToMany(() => Products, (product) => product.id)
  products: Products[];
}
