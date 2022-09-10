import { EntityRepository, Repository } from 'typeorm';
import { Orders } from './entities/order.entity';

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> {
//   async getOrders(_id: number): Promise<any> {
//     // const customer = await this.findOne({
//     //   where: { 'customer.id = :customerId':id },
//     //   relations: ['orders'],
//     // });
//     // return customer.orders;

//     const order = await this.findOne({
//       join: ['customer'],
//       where: { customer: { id: _id } },
//     });
//     return order;
//   }
}
