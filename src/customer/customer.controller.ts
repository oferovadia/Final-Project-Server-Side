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
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { CustomValidatorPipe } from 'src/validations/custom-validator.pipe';
import { CustomerDto } from './customer-dto';
import { CustomerService } from './customer.service';
import { LoginCustomerDto } from './login.customer.dto';
import { RegisterCustomerDto } from './register.customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  //get all customers
  getAll() {
    const customers = this.customerService.getCustomers();
    return customers;
  }

  @Post('login')
  async login(
    @Body() loggedCustomer: LoginCustomerDto,
    @Session() session: Record<string, any>,
  ) {
    const userLogged = await this.customerService.loginCustomer(loggedCustomer);
    if (userLogged) {
      this.customerService.createLoggedCookie(session, userLogged);
      console.log(session.userLoggedCookie);
    }
    return userLogged;
  }

  @Post('register')
  //register a new customer
  @UsePipes(new ValidationPipe())
  async create(
    @Body() newCustomer: RegisterCustomerDto,
    @Session() session: Record<string, any>,
  ) {
    const registedUser = await this.customerService.registerCustomer(
      newCustomer,
    );
    if (registedUser) {
      this.customerService.createLoggedCookie(session, registedUser);
    }
    return registedUser;
  }

  // @Get(':id')
  // findCustomer(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  //     }),
  //   )
  //   id: number,
  // ) {
  //   console.log(typeof id);
  //   return this.customerService.find(id);
  // }

  // @Get('/email/:email')
  // findCustomerByEmail(@Param('email') email: string) {
  //   console.log(typeof email);
  //   return this.customerService.findByEmail(email);
  // }

  // // @Get('orders')
  // // @UsePipes(CustomValidatorPipe)
  // // orders(
  // //   @Query('asc', new DefaultValuePipe(true), ParseBoolPipe) asc: boolean,
  // // ) {
  // //   return asc;
  // // }

  // @Get(':id/orders')
  // async customerOrders(@Param('id', ParseIntPipe) id: number) {
  //   const orders = await this.customerService.getOrders(id);
  //   return orders;
  // }

  // // @Get('specific')
  // // orders(@Query('id', CustomValidatorPipe) cust: CustomerDto) {
  // //   return cust;
  // // }
}
