import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) { }

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findByProductID(id);
  }

  @Post('/add')
  async addToCart(
    @Body() details: object,
    @Session() session: Record<string, any>,
  ) {
    return this.cartService.addToCart(details, session);
  }

  @Delete(':cartDetailsID')
  async removeFromCart(@Param() cartDetailsID) {
    this.cartService.removeProduct(cartDetailsID.cartDetailsID);
  }

  @Patch()
  async updateItem(@Body() details: object) {
    return this.cartService.updateItemQuantity(details);
  }
}
