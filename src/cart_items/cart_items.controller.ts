import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { AddItemToCartDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CartResponse } from './interfaces/CartResponse';

@ApiTags('Cart Items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post('add')
  @ApiOperation({ summary: 'Agregar producto al carrito' })
  @ApiCreatedResponse({
    description: 'Producto agregado al carrito exitosamente.',
    schema: {
      example: {
        statusCode: 201,
        message: 'Producto agregado correctamente al carrito',
        data: {
          id: 1,
          quantity: 2,
          userId: 5,
          productId: 10,
        },
        ERROR: false,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Error al agregar producto.',
    schema: {
      example: {
        statusCode: 400,
        message: 'No hay suficiente stock',
        ERROR: true,
      },
    },
  })
  @ApiBody({ type: AddItemToCartDto })
  addItem(@Body() addItemToCartDto: AddItemToCartDto): Promise<CartResponse> {
    return this.cartItemsService.addItem(addItemToCartDto);
  }

  @Get('all/:userId')
  @ApiOperation({
    summary: 'Obtener todos los productos del carrito de un usuario',
  })
  @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Listado de productos obtenido correctamente.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Productos encontrados',
        data: [
          {
            id: 1,
            quantity: 2,
            userId: 5,
            productId: 10,
          },
        ],
        ERROR: false,
      },
    },
  })
  getAllItemsToUserId(@Param('userId') userId: number): Promise<CartResponse> {
    return this.cartItemsService.getAllItemsToUserId(userId);
  }

  @Delete('clear/:userId')
  @ApiOperation({ summary: 'Vaciar todo el carrito de un usuario' })
  @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Carrito vaciado correctamente.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Carrito eliminado con éxito',
        data: [],
        ERROR: false,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'El carrito ya estaba vacío.',
    schema: {
      example: {
        statusCode: 404,
        message: 'El carrito está vacío',
        ERROR: true,
      },
    },
  })
  clearCart(@Param('userId') userId: number): Promise<CartResponse> {
    return this.cartItemsService.clearCart(userId);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Actualizar cantidad de un producto en el carrito' })
  @ApiBody({ type: UpdateCartItemDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Producto actualizado correctamente',
        data: {
          id: 1,
          quantity: 5,
          userId: 5,
          productId: 10,
        },
        ERROR: false,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Producto no encontrado en el carrito.',
    schema: {
      example: {
        statusCode: 404,
        message: 'El cart item no existe',
        ERROR: true,
      },
    },
  })
  update(@Body() updateCartItemDto: UpdateCartItemDto): Promise<CartResponse> {
    return this.cartItemsService.updateItem(updateCartItemDto);
  }

  @Delete('remove/:userId/:productId')
  @ApiOperation({ summary: 'Eliminar un producto específico del carrito' })
  @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID del producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Producto eliminado del carrito',
        data: {
          id: 1,
          quantity: 2,
          userId: 5,
          productId: 10,
        },
        ERROR: false,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Producto no encontrado en el carrito.',
    schema: {
      example: {
        statusCode: 404,
        message: 'El cart item no existe',
        ERROR: true,
      },
    },
  })
  removeItem(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ): Promise<CartResponse> {
    return this.cartItemsService.removeItem(userId, productId);
  }
}
