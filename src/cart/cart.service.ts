import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import session from 'express-session';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
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
      const cartDetailsAndProductDetails = await this.cartDetailsRipo.find({
        where: { cart: { id: cartAndCustomer.id } },
        relations: ['product'],
      });
      details.push(cartAndCustomer, cartDetailsAndProductDetails);
    }
    return details;
  }

  async addToCart(details, session) {
    const userID = session.userLoggedCookie;
    const cart = await this.cartRipo.findOne({
      where: { customer_id: userID },
      relations: ['customer'],
    });
    //if user doesnt have a cart, create one and add the product
    if (!cart) {
      console.log(cart);
      const newCart = this.cartRipo.create({
        customer_id: userID,
      });
      await this.cartRipo.save(newCart);
      this.createCartDetails(
        newCart.id,
        details.product_id,
        details.quantity,
        details.total,
        details.size,
      );
    }
    //if the user does have a cart
    else {
      const itemIsInCart = await this.isItemInCart(
        details.product_id,
        details.size,
        cart.id,
      );
      //if the item is not in the cart already
      if (itemIsInCart.length === 0) {
        this.createCartDetails(
          cart.id,
          details.product_id,
          details.quantity,
          details.total,
          details.size,
        );
      }
      //if the item is in the cart
      else {
        console.log('item is already in cart!');
        console.log(itemIsInCart);
        this.updateItemQuantity({
          quantity: itemIsInCart[0].quantity + details.quantity,
          cartDetailsID: itemIsInCart[0].id,
          total_products_price:
            itemIsInCart[0].total_products_price + details.total,
          addedFromProduct: true,
        });
        return cart;
      }
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

  async isItemInCart(product_id, size, cart_id) {
    return this.cartDetailsRipo.find({
      where: { product_id: product_id, size: size, cart_id: cart_id },
    });
  }

  async updateItemQuantity(details) {
    console.log(details.length, details);

    const { quantity, cartDetailsID, total_products_price } = details;
    if (!details.addedFromProduct) {
      console.log('inside if');
      this.cartDetailsRipo.update(
        { id: cartDetailsID },
        { quantity, total_products_price },
      );
    } else {
      console.log('inside else');
      this.cartDetailsRipo.update(
        { id: cartDetailsID },
        { quantity, total_products_price },
      );
    }
    return 'good';
  }
}
