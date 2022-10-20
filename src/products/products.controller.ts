import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get('/test')
  getTest() {
    return this.productsService.getTest();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findByProductID(id);
  }
}
