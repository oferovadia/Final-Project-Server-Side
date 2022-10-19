import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { Photos } from './photos.entity';
import { Product_Details } from './productDetails.entity';
import { Cart_Details } from 'src/cart/entities/cartDetails.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 45,
  })
  product_name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 250,
  })
  description: string;

  @OneToMany(() => Photos, (photo) => photo.product, { eager: true })
  photos: Photos[];

  @ManyToOne(() => Categories, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @OneToMany(
    () => Product_Details,
    (productDetails) => productDetails.product,
    { eager: true },
  )
  productDetails: Product_Details[];

  @OneToMany(() => Cart_Details, (cartDetails) => cartDetails.product)
  cartDetails: Cart_Details[];
}
