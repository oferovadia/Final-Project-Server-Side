import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { Products } from './entities/product.entity';
import { Photos } from './entities/photos.entity';
import { Product_Details } from './entities/productDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Products, Photos, Product_Details]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
