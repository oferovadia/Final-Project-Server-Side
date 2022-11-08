import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Customers } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Repository } from 'typeorm';
import { OrderDTO } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { Order_Details } from './entities/orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRipo: Repository<Orders>,
    @InjectRepository(Cart) private cartRipo: Repository<Cart>,
    @InjectRepository(Customers) private customersRipo: Repository<Customers>,
    @InjectRepository(Order_Details)
    private orderDetailsRipo: Repository<Order_Details>,
    private customerService: CustomerService,
  ) {}

  async create() {
    const object = {
      order_date: '0000-00-00',
      required_date: '0000-00-00',
      shipped_date: '0000-00-00',
      country: 'Israel',
      city: 'Bat Yam',
      address: 'Herzel 56',
      postal_code: '123456',
      phone: '0522223038',
    };
    const cart = await this.cartRipo.findOne(4);
    const order = this.ordersRipo.create(object);
    // await this.ordersRipo.save(order);
    return order;
  }

  findAll() {
    return this.ordersRipo.find();
  }

  async findOrderByCustomerID(id: number) {
    const details = [];
    const orderAndCustomer = await this.customersRipo.find({
      where: { id },
      relations: ['orders'],
    });
    // if (orderAndCustomer) {
    //   const orderD = await this.orderDetailsRipo.find({
    //     where: { cart: { id: orderAndCustomer.id } },
    //   });
    //   details.push(orderAndCustomer, orderD);
    // }
    return orderAndCustomer;
  }
}
