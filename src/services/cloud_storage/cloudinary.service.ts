import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async uploadImage(image: string | Buffer): Promise<UploadApiResponse> {
    try {
      let uploadStr: string;

      if (Buffer.isBuffer(image)) {
        uploadStr = 'data:image/png;base64,' + image.toString('base64');
      } else {
        uploadStr = image;
      }

      const result = await cloudinary.uploader.upload(uploadStr, {
        resource_type: 'auto',
      });
      return result;
    } catch (error) {
      const err = error as UploadApiErrorResponse;
      throw new Error(`Error al subir la imagen: ${err.message}`);
    }
  }

  async deleteImage(publicId: string): Promise<UploadApiResponse> {
    try {
      const result = (await cloudinary.uploader.destroy(
        publicId,
      )) as UploadApiResponse;
      return result;
    } catch (error) {
      const err = error as UploadApiErrorResponse;
      throw new Error(`Error al eliminar la imagen: ${err.message}`);
    }
  }
}
