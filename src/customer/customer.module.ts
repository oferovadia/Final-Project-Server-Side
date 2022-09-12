import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/order.entity';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository, Orders])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
