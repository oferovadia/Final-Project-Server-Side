import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  async findCartDetails(@Session() session: Record<string, any>) {
    const userID = session.userLoggedCookie;
    console.log(userID);
    return this.cartService.findCartByCustomerID(3);
  }

  @Post()
  createOrderFromCart() {
    return this.ordersService.create();
  }
}
