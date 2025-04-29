import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddItemToCartDto {
  @IsNumber()
  @IsOptional()
  readonly id?: number;

  @ApiProperty({
    description: 'ID del usuario dueño del ítem',
    example: 1,
  })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    description: 'ID del producto añadido al carrito',
    example: 5,
  })
  @IsNotEmpty()
  readonly productId: number;

  @ApiProperty({
    description: 'Cantidad del producto que se quiere añadir al carrito',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}
