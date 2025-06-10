import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from './dto/product.dto';
import { PaginationDto } from './dto/pagination-query.dto';
import { Category } from 'src/categories/entities/category.entity';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    console.log('Creating product: ' + JSON.stringify(product));
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

  async findOne(id: number) {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: {
          category: true,
          images: true,
        },
      });
      this.logger.log(`Finding product with id: ${id}`);
      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      this.logger.log(`Product found: ${JSON.stringify(product)}`);
      return product;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`Error finding product with id ${id}`, error.message);
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const { categoryId, ...rest } = updateProductDto;
      this.logger.log(`Updating product with id: ${id}`);

      const product = await this.productsRepository.preload({
        id,
        ...rest,
      });

      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      if (categoryId) {
        const categoryEntity = await this.categoryRepository.findOne({
          where: { id: categoryId },
        });
        if (!categoryEntity) {
          throw new NotFoundException(
            `Categoría con ID ${categoryId} no encontrada`,
          );
        }
        product.category = categoryEntity;
      }

      return await this.productsRepository.save(product);
    } catch (error) {
      this.logger.error(
        `Error actualizando producto con id ${id}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.stack,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(error.message); // "Algo falló"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(error.stack); // muestra el stack trace completo con la línea donde ocurrió
      throw error;
    }
  }
  async findPaginated({ page = 1, limit = 10 }: PaginationDto) {
    const [products, total] = await this.productsRepository.findAndCount({
      relations: {
        category: true,
        images: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'ASC',
      },
    });

    return {
      data: plainToInstance(ProductDto, products, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      limit,
    };
  }
  remove(id: number) {
    this.logger.log(`Removing product with id: ${id}`);
    return this.productsRepository.delete(id);
  }
}
