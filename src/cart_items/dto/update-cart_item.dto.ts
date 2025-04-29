import { PartialType } from '@nestjs/mapped-types';
import { AddItemToCartDto } from './create-cart_item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto extends PartialType(AddItemToCartDto) {
  @ApiProperty({
    description: 'Cantidad del producto que se quiere actualizar en el carrito',
    example: 3,
  })
  quantity: number;

  @ApiProperty({
    description: 'ID del usuario dueño del ítem',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'ID del producto que se quiere actualizar en el carrito',
    example: 5,
  })
  productId: number;
}
