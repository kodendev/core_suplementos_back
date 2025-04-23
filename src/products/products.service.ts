import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    this.logger.log('Creating product: ' + JSON.stringify(product));
    return this.productsRepository.save(product);
  }

  findAll() {
    this.logger.log('Finding all products');
    return this.productsRepository.find();
  }

  findOne(id: number) {
    this.logger.log(`Finding product with id: ${id}`);
    return this.productsRepository.findOne({ where: { id } });
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    this.logger.log(`Removing product with id: ${id}`);
    return this.productsRepository.delete(id);
  }
}
