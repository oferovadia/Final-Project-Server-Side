import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Customers } from 'src/customer/customer.entity';
import { Products } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartDetailsDto } from './dto/create-cartDetails-dto';
import { Cart } from './entities/cart.entity';
import { Cart_Details } from './entities/cartDetails.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRipo: Repository<Cart>,
    @InjectRepository(Cart_Details)
    private cartDetailsRipo: Repository<Cart_Details>,
    // @InjectRepository(Products) private productRipo: Repository<Products>,
    private readonly productService: ProductsService,
  ) { }

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
      where: { customer_id: id },
      relations: ['customer'],
    });
    if (cartAndCustomer) {
      const cartDetails = await this.cartDetailsRipo.find({
        where: { cart: { id: cartAndCustomer.id } },
      });
      details.push(cartAndCustomer, cartDetails);
    }
    return details;
  }

  async addToCart(details) {
    const cart = await this.cartRipo.findOne({
      where: { customer_id: details.customer_id },
      relations: ['customer'],
    });
    //if user doesnt have a cart, create one and add the product
    if (!cart) {
      const newCart = this.cartRipo.create({
        customer_id: details.customer_id,
      });
      this.cartRipo.save(newCart);
      this.createCartDetails(
        newCart.id,
        details.product_id,
        details.quantity,
        details.total,
        details.size,
      );
    } else {
      this.createCartDetails(
        cart.id,
        details.product_id,
        details.quantity,
        details.total,
        details.size,
      );
    }
    return cart;
  }

  async createCartDetails(
    cartID,
    productID,
    quantity,
    total_products_price,
    size,
  ) {
    const cartDetails = this.cartDetailsRipo.create({
      cart_id: cartID,
      product_id: productID,
      quantity: quantity,
      total_products_price: total_products_price,
      size: size,
    });
    this.cartDetailsRipo.save(cartDetails);
  }

  async removeProduct(cartDetailsID) {
    return this.cartDetailsRipo.delete({ id: cartDetailsID });
  }
}
