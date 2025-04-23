import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  readonly orderId: number; // ID de la orden asociada

  @IsNotEmpty()
  readonly productId: number; // ID del producto asociado

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number; // Cantidad de producto

  @IsNumber()
  @IsNotEmpty()
  readonly price: number; // Precio unitario

  @IsNumber()
  @IsNotEmpty()
  readonly total: number; // Total de la línea de orden (precio * cantidad)
}
