import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  readonly userId: number; // ID del usuario dueño del ítem

  @IsNotEmpty()
  readonly productId: number; // ID del producto añadido al carrito

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number; // Cantidad del producto en el carrito
}
