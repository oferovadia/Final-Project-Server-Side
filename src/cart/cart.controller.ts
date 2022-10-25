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
  ) { }

  @Get()
  async findCartDetails(@Session() session: Record<string, any>) {
    if (session.userLoggedCookie) {
      const userID = session.userLoggedCookie;
      return this.cartService.findCartByCustomerID(userID);
    } else {
      const userID = 2;
      return this.cartService.findCartByCustomerID(userID);
    }
  }

  @Post()
  createOrderFromCart() {
    return this.ordersService.create();
  }
}
