import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart_Details } from './entities/cartDetails.entity';
import { Customers } from 'src/customer/customer.entity';
import { OrdersService } from 'src/orders/orders.service';
import { Orders } from 'src/orders/entities/order.entity';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerRepository } from 'src/customer/customer.repository';
import { Order_Details } from 'src/orders/entities/orderDetails.entity';
import { ProductsService } from 'src/products/products.service';
import { Products } from 'src/products/entities/product.entity';
import { Photos } from 'src/products/entities/photos.entity';
import { Product_Details } from 'src/products/entities/productDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      Cart_Details,
      Customers,
      Orders,
      CustomerRepository,
      Order_Details,
      Products,
      Photos,
      Product_Details,
    ]),
  ],
  controllers: [CartController],
  providers: [
    CartService,
    OrdersService,
    CustomerService,
    Products,
    ProductsService,
  ],
})
export class CartModule {}
