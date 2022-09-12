import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/customer/customer.entity';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Cart_Details } from './entities/cartDetails.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRipo: Repository<Cart>,
    @InjectRepository(Cart_Details)
    private cartDetailsRipo: Repository<Cart_Details>,
  ) {}

  async findAll() {
    return this.cartRipo.find();
  }

  async findCartByID(id: number) {
    const cart = await this.cartRipo.findOne(id);
    const cartDetails = await this.cartDetailsRipo.find({
      where: { cart: { id: cart.id } },
    });

    return [cart, cartDetails];
  }

  async findCartByCustomerID(id: number) {
    const details = [];
    const cartAndCustomer = await this.cartRipo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (cartAndCustomer) {
      const cartD = await this.cartDetailsRipo.find({
        where: { cart: { id: cartAndCustomer.id } },
      });
      details.push(cartAndCustomer, cartD);
    }
    return details;
  }
}
