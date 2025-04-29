import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart_item.entity';
import { Product } from 'src/products/entities/product.entity';
import { AddItemToCartDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartResponse } from './interfaces/CartResponse';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addItem(addItemToCartDto: AddItemToCartDto): Promise<CartResponse> {
    const { productId, quantity } = addItemToCartDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new BadRequestException({
        message: 'El producto no existe',
        statusCode: 404,
        ERROR: true,
      });
    }

    if (product.stockQuantity < quantity) {
      throw new BadRequestException({
        message: 'No hay suficiente stock',
        statusCode: 400,
        ERROR: true,
      });
    }

    const cartItemExists = await this.cartItemsRepository.findOne({
      where: {
        productId: { id: productId },
        user: { id: addItemToCartDto.userId },
      },
    });

    let savedItem: CartItem;

    if (cartItemExists) {
      if (cartItemExists.quantity + quantity <= 0) {
        throw new BadRequestException({
          message: 'La cantidad debe ser mayor a 0',
          statusCode: 400,
          ERROR: true,
        });
      }
      cartItemExists.quantity += quantity;
      if (cartItemExists.quantity + product.stockQuantity < 0) {
        throw new BadRequestException({
          message: 'No hay suficiente stock',
          statusCode: 400,
          ERROR: true,
        });
      }
      savedItem = await this.cartItemsRepository.save(cartItemExists);
    } else {
      const cartItem = this.cartItemsRepository.create({
        productId: { id: productId },
        quantity,
        user: { id: addItemToCartDto.userId },
      });
      savedItem = await this.cartItemsRepository.save(cartItem);
    }

    return {
      statusCode: 201,
      message: 'Producto agregado al carrito',
      data: savedItem,
      ERROR: false,
    };
  }

  async getAllItemsToUserId(userId: number): Promise<CartResponse> {
    const items = await this.cartItemsRepository.find({
      where: { user: { id: userId } },
    });

    return {
      statusCode: 200,
      message: 'Productos obtenidos correctamente',
      data: items,
      ERROR: false,
    };
  }

  async clearCart(userId: number): Promise<CartResponse> {
    const cartItems = await this.cartItemsRepository.find({
      where: { user: { id: userId } },
    });

    if (!cartItems.length) {
      throw new BadRequestException({
        message: 'El carrito está vacío',
        statusCode: 404,
        ERROR: true,
      });
    }

    await this.cartItemsRepository.delete({
      user: { id: userId },
    });

    return {
      statusCode: 200,
      message: 'Carrito eliminado con éxito',
      data: cartItems,
      ERROR: false,
    };
  }

  async updateItem(
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartResponse> {
    const { productId, userId, quantity } = updateCartItemDto;

    if (quantity <= 0) {
      throw new BadRequestException({
        message: 'La cantidad debe ser mayor a 0',
        statusCode: 400,
        ERROR: true,
      });
    }

    const cartItem = await this.cartItemsRepository.findOne({
      where: { productId: { id: productId }, user: { id: userId } },
      relations: { user: true },
    });

    if (!cartItem) {
      throw new BadRequestException({
        message: 'El cart item no existe',
        statusCode: 404,
        ERROR: true,
      });
    }

    Object.assign(cartItem, updateCartItemDto);
    const updatedItem = await this.cartItemsRepository.save(cartItem);

    return {
      statusCode: 200,
      message: 'Item actualizado correctamente',
      data: updatedItem,
      ERROR: false,
    };
  }

  async removeItem(userId: number, productId: number): Promise<CartResponse> {
    const cartItem = await this.cartItemsRepository.findOne({
      where: { productId: { id: productId }, user: { id: userId } },
    });

    if (!cartItem) {
      throw new BadRequestException({
        message: 'El cart item no existe',
        statusCode: 404,
        ERROR: true,
      });
    }

    await this.cartItemsRepository.delete({
      productId: { id: productId },
      user: { id: userId },
    });

    return {
      statusCode: 200,
      message: 'Producto eliminado del carrito',
      data: cartItem,
      ERROR: false,
    };
  }
}
