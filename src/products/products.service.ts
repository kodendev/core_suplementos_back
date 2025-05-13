import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from './dto/product.dto';
import { normalize } from 'src/utils/normalizeText';

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

  async findAll() {
    this.logger.log('Finding all products');
    const products = await this.productsRepository.find({
      relations: {
        category: true,
        images: true,
      },
    });
    return plainToInstance(ProductDto, products, {
      excludeExtraneousValues: true, // Exclude properties not marked with @Expose()
    });
  }

  async searchByName(name: string) {
    this.logger.log(`Searching products with name like: ${name}`);

    const normalizedSearch = normalize(name);

    const products = await this.productsRepository.find({
      relations: {
        category: true,
        images: true,
      },
    });

    const filteredProduct = products.filter((product) =>
      normalize(product.name).includes(normalizedSearch),
    );

    return plainToInstance(ProductDto, filteredProduct, {
      excludeExtraneousValues: true,
    });
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
