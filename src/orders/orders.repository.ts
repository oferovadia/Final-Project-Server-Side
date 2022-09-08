import { EntityRepository, Repository } from 'typeorm';
import { Orders } from './entities/order.entity';

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> {}
