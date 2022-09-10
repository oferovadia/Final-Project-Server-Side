import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from 'src/orders/orders.repository';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository, OrdersRepository])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
