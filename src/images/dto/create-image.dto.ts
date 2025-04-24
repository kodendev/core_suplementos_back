import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  imageUrl: string; // URL de la imagen subida
}
