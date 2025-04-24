import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { Product } from '../products/entities/product.entity';
import { CloudinaryService } from 'src/services/cloud_storage/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Product])],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryService],
  exports: [ImageService, CloudinaryService],
})
export class ImageModule {}
