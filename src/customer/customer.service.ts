import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { Customers } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { LoginCustomerDto } from './login.customer.dto';
import { RegisterCustomerDto } from './register.customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private customerRipo: CustomerRepository,
    @InjectRepository(Orders) private ordersRipo: Repository<Orders>,
  ) {}

  getCustomers(): Promise<Customers[]> {
    return this.customerRipo.find();
  }

  async registerCustomer(newCustomer: RegisterCustomerDto): Promise<Customers> {
    const isEmailTaken = await this.findByEmail(newCustomer.email);
    if (!isEmailTaken) {
      const customer = this.customerRipo.create([{ ...newCustomer }]);
      if (customer.length) {
        return this.customerRipo.save(customer[0]);
      }
    }
    throw new HttpException('Email is taken! ', HttpStatus.NOT_ACCEPTABLE);
  }

  async loginCustomer(newCustomer: LoginCustomerDto): Promise<Customers> {
    const customer = await this.findByEmail(newCustomer.email);
    if (customer) {
      if (customer.password == newCustomer.password) {
        return customer;
      }
    }
    throw new HttpException(
      'Wrong Email Or Password! ',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  createLoggedCookie(session: Record<string, any>, user) {
    session.userLoggedCookie = user.id;
    session.name = user.first_name;
    return true;
  }

  emptyLoggedCookie(session: Record<string, any>) {
    session.userLoggedCookie = '';
  }

  find(id: number): Promise<Customers> {
    return this.customerRipo.findOne(id);
  }

  findByEmail(email: string): Promise<Customers> {
    return this.customerRipo.findByEmail(email);
  }

  async getOrders(id: number): Promise<Orders[]> {
    const orders = await this.customerRipo.getOrders(id);
    return orders;
  }

  async findCustomerByID(session) {
    const id = session.userLoggedCookie;
    return await this.customerRipo.findOne(id);
  }
}
