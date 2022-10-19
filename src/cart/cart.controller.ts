import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findCartByID(+id);
  }

  @Get('/user/:id')
  findByCustomer(@Param('id') id: string) {
    return this.cartService.findCartByCustomerID(+id);
  }

  @Post()
  createOrderFromCart() {
    return this.ordersService.create();
  }
}