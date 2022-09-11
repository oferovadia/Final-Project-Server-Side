import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart_Details } from './entities/cartDetails.entity';
import { Customers } from 'src/customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Cart_Details, Customers])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
