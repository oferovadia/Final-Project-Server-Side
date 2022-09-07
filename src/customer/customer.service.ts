import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { CustomerDto } from './customer-dto';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRipo: CustomerRepository) {}

  getCustomers(): Promise<Customer[]> {
    return this.customerRipo.find();
  }

  async add(newCustomer: CustomerDto): Promise<Customer> {
    console.log(newCustomer);
    const customer = this.customerRipo.create([{ ...newCustomer }]);
    if (customer.length) {
      return this.customerRipo.save(customer[0]);
    }
    throw new HttpException('lala', HttpStatus.INTERNAL_SERVER_ERROR);
    //this._customers.push(newCustomer);
  }

  find(id: number): Promise<Customer> {
    return this.customerRipo.findOne(id);
  }

  findByEmail(email: string): Promise<Customer> {
    return this.customerRipo.findByEmail(email);
  }

  async getOrders(id: number): Promise<Order[]> {
    const orders = await this.customerRipo.getOrders(id);
    return orders;
  }
}
