import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories) private categoryRipo: Repository<Categories>,
    @InjectRepository(Products) private productsRipo: Repository<Products>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return this.categoryRipo.find();
  }

  async findCategoryIdByCategoryName(name: string): Promise<Categories> {
    console.log(name);
    return await this.categoryRipo.findOne({
      where: { category_name: name },
    });
  }

  async findByCategoryName(name: string) {
    if (name.includes('All')) {
      const categoryId = await this.findCategoryIdByCategoryName(name.slice(3));
      return this.productsRipo.find({
        where: { category: { parent_id: categoryId.id } },
        relations: ['category'],
      });
    }
    return this.productsRipo.find({
      where: { category: { category_name: name } },
      relations: ['category'],
    });
  }

  async testFunc(name: string) {
    const category = await this.categoryRipo.find({
      where: { category_name: name },
    });
    const category_id = category[0]['id'];

    const allProducts = [];
    const products = await this.productsRipo.find({
      where: { category: category_id },
      relations: ['category'],
    });

    // for (const category of categories) {
    //   const products = await this.productsRipo.find({
    //     where: { product: { id: product.id } },
    //     // select: [''],
    //   });
    //   const productDetails = await this.productDetailsRipo.find({
    //     where: { product: { id: product.id } },
    //   });
    //   const newProduct = this.productsRipo.create({
    //     ...product,
    //     photos,
    //     productDetails,
    //   });
    //   allProducts.push(newProduct);
    // }
    return products;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
