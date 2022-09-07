import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Scope,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomValidatorPipe } from 'src/validations/custom-validator.pipe';
import { CustomerDto } from './customer-dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAll() {
    const customers = this.customerService.getCustomers();
    return customers;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() newCustomer: CustomerDto) {
    return this.customerService.add(newCustomer);
  }

  @Get(':id')
  findCustomer(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ) {
    console.log(typeof id);
    return this.customerService.find(id);
  }

  @Get('/email/:email')
  findCustomerByEmail(@Param('email') email: string) {
    console.log(typeof email);
    return this.customerService.findByEmail(email);
  }

  // @Get('orders')
  // @UsePipes(CustomValidatorPipe)
  // orders(
  //   @Query('asc', new DefaultValuePipe(true), ParseBoolPipe) asc: boolean,
  // ) {
  //   return asc;
  // }

  @Get(':id/orders')
  async customerOrders(@Param('id', ParseIntPipe) id: number) {
    const orders = await this.customerService.getOrders(id);
    return orders;
  }

  @Get('specific')
  orders(@Query('id', CustomValidatorPipe) cust: CustomerDto) {
    return cust;
  }
}
