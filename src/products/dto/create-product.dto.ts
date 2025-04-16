import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDecimal,
  IsInt,
  IsDate,
} from 'class-validator';

// DTO para la creación de un producto
export class CreateProductDto {
  // Nombre del producto
  @IsString()
  name: string;

  // Descripción completa del producto
  @IsString()
  description: string;

  // Descripción corta del producto
  @IsString()
  smallDescription: string;

  // Segunda descripción corta adicional
  @IsString()
  smallDescriptionOne: string;

  // Tercera descripción corta adicional
  @IsString()
  smallDescriptionTwo: string;

  // Cuarta descripción corta adicional
  @IsString()
  smallDescriptionThree: string;

  // Precio unitario del producto
  @IsDecimal()
  priceUnit: number;

  // Cantidad de stock disponible del producto
  @IsInt()
  stockQuantity: number;

  // Estado del producto (activo o inactivo)
  @IsBoolean()
  isActive: boolean;

  // ID de la categoría a la que pertenece el producto (relación muchos-a-uno)
  @IsInt()
  categoryId: number;

  // Imagen principal del producto (URL o nombre de archivo)
  @IsString()
  image: string;

  // Fecha de creación (opcional, se asigna automáticamente si no se proporciona)
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  // Fecha de actualización (opcional, se asigna automáticamente si no se proporciona)
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
