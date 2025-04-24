import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsDate,
  IsNumber,
} from 'class-validator';
import { CategoryExists } from 'src/common/decorators/CategoryExists.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// DTO para la creación de un producto
export class CreateProductDto {
  @ApiProperty({ example: 'Proteína Whey', description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Suplemento de proteína de alta calidad.',
    description: 'Descripción completa del producto',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Rápida absorción',
    description: 'Descripción corta del producto',
  })
  @IsString()
  smallDescription: string;

  @ApiProperty({
    example: 'Sabor vainilla',
    description: 'Segunda descripción corta adicional',
  })
  @IsString()
  smallDescriptionOne: string;

  @ApiProperty({
    example: 'Incluye aminoácidos',
    description: 'Tercera descripción corta adicional',
  })
  @IsString()
  smallDescriptionTwo: string;

  @ApiProperty({
    example: 'Sin azúcar añadida',
    description: 'Cuarta descripción corta adicional',
  })
  @IsString()
  smallDescriptionThree: string;

  @ApiProperty({ example: 599.99, description: 'Precio unitario del producto' })
  @IsNumber({ maxDecimalPlaces: 2 })
  priceUnit: number;

  @ApiProperty({
    example: 100,
    description: 'Cantidad de stock disponible del producto',
  })
  @IsInt()
  stockQuantity: number;

  @ApiProperty({
    example: true,
    description: 'Estado del producto (activo o inactivo)',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID de la categoría a la que pertenece el producto',
  })
  @CategoryExists()
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'Imagen principal del producto (URL o nombre de archivo)',
  })
  @IsString()
  image: string;

  @ApiPropertyOptional({
    example: '2024-04-23T12:34:56.789Z',
    description:
      'Fecha de creación (opcional, se asigna automáticamente si no se proporciona)',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2024-04-23T12:34:56.789Z',
    description:
      'Fecha de actualización (opcional, se asigna automáticamente si no se proporciona)',
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
