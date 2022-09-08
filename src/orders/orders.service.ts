import { Injectable } from '@nestjs/common';
import { Customers } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRipo: OrdersRepository,
    private customerService: CustomerService,
  ) {}
  // async create(createOrderDto: CreateOrderDto) {
  //   const { customerId, price } = createOrderDto;
  //   const customer = await this.customerService.find(customerId);
  //   const order = this.ordersRipo.create({ price, customer });
  //   await this.ordersRipo.save(order);
  //   return order;
  // }

  findAll() {
    return this.ordersRipo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
