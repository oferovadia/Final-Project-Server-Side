/* eslint-disable prettier/prettier */
import { Orders } from 'src/orders/entities/order.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Customers } from './customer.entity';

@EntityRepository(Customers)
export class CustomerRepository extends Repository<Customers> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  async getOrders(id: number): Promise<Orders[]> {
    const customer = await this.findOne({
      where: { id },
      relations: ['orders'],
    });
    return customer.orders;
  }
}
