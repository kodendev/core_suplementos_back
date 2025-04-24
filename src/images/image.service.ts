/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { Product } from '../products/entities/product.entity';
import { CloudinaryService } from 'src/services/cloud_storage/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private cloudinaryService: CloudinaryService,
  ) {}

  // Subir una imagen a un producto
  async uploadImage(
    productId: number,
    file: Express.Multer.File,
  ): Promise<Image> {
    // Buscamos el producto
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }
    console.log(file);
    // Validamos que el archivo esté presente y que tenga la propiedad `buffer`
    if (!file || !file.buffer) {
      throw new Error('Archivo no válido');
    }

    // Subimos la imagen a Cloudinary
    // Usamos la aserción de tipo para que TypeScript reconozca `file.buffer` como válido
    const result = await this.cloudinaryService.uploadImage(file.buffer);
    console.log('result', result);
    // Verificamos que la subida haya sido exitosa

    if (!result || !result.secure_url) {
      throw new Error('Error uploading image to Cloudinary');
    }

    // Creamos la entidad `Image` y la guardamos
    const image = this.imageRepository.create({
      url: result.secure_url,
      product,
    });

    return this.imageRepository.save(image);
  }
  // Obtener imágenes de un producto
  async getProductImages(productId: number): Promise<Image[]> {
    return this.imageRepository.find({ where: { product: { id: productId } } });
  }

  //   // Marcar una imagen como principal
  //   async setMainImage(productId: number, imageId: number): Promise<Image> {
  //     const product = await this.productRepository.findOne(productId);
  //     const image = await this.imageRepository.findOne(imageId);

  //     if (!product || !image) {
  //       throw new Error('Product or image not found');
  //     }

  //     await this.imageRepository.update(
  //       { product: { id: productId } },
  //       { isMain: false },
  //     );
  //     image.isMain = true;
  //     return this.imageRepository.save(image);
  //   }
}
