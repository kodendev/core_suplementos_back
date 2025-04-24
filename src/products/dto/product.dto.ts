// src/products/dto/product.dto.ts
import { IsNumber, IsString, IsArray, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';
import { ImageDto } from 'src/images/dto/image.dto';
import { CategoryDto } from 'src/categories/dto/category.dto';
import { Type } from 'class-transformer';
export class ProductDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  smallDescriptionThree: string;

  @Expose()
  @IsString()
  priceUnit: string;

  @Expose()
  @IsString()
  smallDescriptionOne: string;

  @Expose()
  @IsString()
  smallDescriptionTwo: string;

  @Expose()
  @IsNumber()
  stockQuantity: number;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[];

  @Expose()
  @IsArray()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  @IsString()
  image: string;
}
