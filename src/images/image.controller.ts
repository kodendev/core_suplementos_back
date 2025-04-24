import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // Subir una imagen
  @Post(':productId')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el formulario
  async uploadImage(
    @Param('productId') productId: number,
    @UploadedFile() file: Express.Multer.File, // Aquí recibimos el archivo
    @Body() request: Request, // Aquí recibimos el resto de los datos del formulario
  ) {
    console.log(request);
    return this.imageService.uploadImage(productId, file); // Llamamos al servicio
  }

  // Obtener todas las imágenes de un producto
  @Get(':productId')
  async getProductImages(@Param('productId') productId: number) {
    return this.imageService.getProductImages(productId);
  }

  // Marcar una imagen como principal
  //   @Post(':productId/set-main/:imageId')
  //   async setMainImage(
  //     @Param('productId') productId: number,
  //     @Param('imageId') imageId: number,
  //   ) {
  //     return this.imageService.setMainImage(productId, imageId);
  //   }
}
