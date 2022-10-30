import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { Products } from './entities/product.entity';
import { Photos } from './entities/photos.entity';
import { Product_Details } from './entities/productDetails.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart_Details } from 'src/cart/entities/cartDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Categories,
      Products,
      Photos,
      Product_Details,
      Cart,
      Cart_Details,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CartService],
})
export class ProductsModule {}
