import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { createConnection, Repository } from 'typeorm';
import { Photos } from './entities/photos.entity';
import { Products } from './entities/product.entity';
import { Product_Details } from './entities/productDetails.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productsRipo: Repository<Products>,
    @InjectRepository(Photos) private photosRipo: Repository<Products>,
    @InjectRepository(Product_Details)
    private productDetailsRipo: Repository<Product_Details>,
  ) {}

  async findAll() {
    const products = await this.productsRipo.find();
    const allProducts = [];
    for (const product of products) {
      const photos = await this.photosRipo.find({
        where: { product: { id: product.id } },
        // select: [''],
      });
      const productDetails = await this.productDetailsRipo.find({
        where: { product: { id: product.id } },
      });
      const newProduct = this.productsRipo.create({
        ...product,
        photos,
        productDetails,
      });
      allProducts.push(newProduct);
    }
    return allProducts;

    // const products = await this.productsRipo.find({
    //   select: {
    //     product_name: true,
    //     description: true,
    //   },
    //   relations: {
    //     profile: true,
    //     photos: true,
    //     videos: true,
    //   },
    //   where: {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     profile: {
    //       userName: 'tshaw',
    //     },
    //   },
    //   order: {
    //     name: 'ASC',
    //     id: 'DESC',
    //   },
    //   skip: 5,
    //   take: 10,
    //   cache: true,
    // });
  }

  // async getProductByID() {
  //   const products = this.productsRipo.find({
  //     select: ['product_name', 'description', 'id'],

  //     // order: { product_name: 'DESC' },
  //     relations: ['photos', 'productDetails'],
  //   });
  //   return products;
  // }

  async findByProductID(id) {
    return this.productsRipo.findOne(id);
  }

  
}
