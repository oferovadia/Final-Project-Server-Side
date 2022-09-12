import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersService.create(createOrderDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  @Get('/user/:id')
  findOrderByCustomerID(@Param('id') id: string) {
    return this.ordersService.findOrderByCustomerID(+id);
  }
}
