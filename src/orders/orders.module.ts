import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { Orders } from './entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order_Details } from './entities/orderDetails.entity';
import { Customers } from 'src/customer/customer.entity';

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forFeature([Orders, Cart, Order_Details, Customers]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
