/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from './cart_items.service';

describe('CartItemsService', () => {
  let service: CartItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartItemsService],
    }).compile();

    service = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addItem', () => {
    it('should add an item to cart when product exists and has enough stock', async () => {
      const mockProduct = { id: 1, quantity: 10 };
      const mockCartItem = {
        id: 1,
        productId: { id: 1 },
        quantity: 5,
        user: { id: 1 },
      };
      const dto = { productId: 1, quantity: 5, userId: 1 };

      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(mockProduct as any);
      jest
        .spyOn(service['cartItemsRepository'], 'create')
        .mockReturnValue(mockCartItem as any);
      jest
        .spyOn(service['cartItemsRepository'], 'save')
        .mockResolvedValue(mockCartItem as any);

      const result = await service.addItem(dto);
      expect(result).toEqual(mockCartItem);
      expect(service['cartItemsRepository'].findOne).toHaveBeenCalledWith({
        where: { productId: { id: 1 } },
      });
      expect(service['cartItemsRepository'].create).toHaveBeenCalledWith({
        productId: { id: 1 },
        quantity: 5,
        user: { id: 1 },
      });
      expect(service['cartItemsRepository'].save).toHaveBeenCalledWith(
        mockCartItem,
      );
    });

    it('should throw BadRequestException if product does not exist', async () => {
      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(null);

      await expect(
        service.addItem({ productId: 1, quantity: 5, userId: 1 }),
      ).rejects.toThrow(/El producto no existe/);
    });

    it('should throw BadRequestException if product has insufficient stock', async () => {
      const mockProduct = { id: 1, quantity: 3 };
      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(mockProduct as any);

      await expect(
        service.addItem({ productId: 1, quantity: 5, userId: 1 }),
      ).rejects.toThrow(/No hay suficiente stock/);
    });
  });

  describe('getAllItemsToUserId', () => {
    it('should return all cart items for a user', async () => {
      const mockCartItems = [
        { id: 1, productId: { id: 1 }, quantity: 5, user: { id: 1 } },
      ];
      jest
        .spyOn(service['cartItemsRepository'], 'find')
        .mockResolvedValue(mockCartItems as any);

      const result = await service.getAllItemsToUserId(1);
      expect(result).toEqual(mockCartItems);
      expect(service['cartItemsRepository'].find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      const mockCartItems = [
        { id: 1, productId: { id: 1 }, quantity: 5, user: { id: 1 } },
      ];
      const mockDeleteResult = { affected: 1, raw: {} };

      jest
        .spyOn(service['cartItemsRepository'], 'find')
        .mockResolvedValue(mockCartItems as any);
      jest
        .spyOn(service['cartItemsRepository'], 'delete')
        .mockResolvedValue(mockDeleteResult as any);

      const result = await service.clearCart(1);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Carrito eliminado con éxito',
        ERROR: false,
        cartItems: mockDeleteResult,
      });
      expect(service['cartItemsRepository'].find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
      expect(service['cartItemsRepository'].delete).toHaveBeenCalledWith({
        user: { id: 1 },
      });
    });

    it('should throw BadRequestException if cart is empty', async () => {
      jest.spyOn(service['cartItemsRepository'], 'find').mockResolvedValue([]);

      await expect(service.clearCart(1)).rejects.toThrow(
        /El carrito está vacío/,
      );
    });
  });

  describe('updateItem', () => {
    it('should update a cart item', async () => {
      const mockCartItem = { id: 1, productId: { id: 1 }, quantity: 5 };
      const updateDto = { quantity: 10 };
      const updatedCartItem = { ...mockCartItem, quantity: 10 };

      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(mockCartItem as any);
      jest
        .spyOn(service['cartItemsRepository'], 'save')
        .mockResolvedValue(updatedCartItem as any);

      const result = await service.updateItem(1, updateDto);
      expect(result).toEqual(updatedCartItem);
      expect(service['cartItemsRepository'].findOne).toHaveBeenCalledWith({
        where: { productId: { id: 1 } },
      });
      expect(service['cartItemsRepository'].save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if cart item does not exist', async () => {
      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(null);

      await expect(service.updateItem(1, { quantity: 10 })).rejects.toThrow(
        /El cart item no existe/,
      );
    });
  });

  describe('removeItem', () => {
    it('should remove an item from cart', async () => {
      const mockCartItem = {
        id: 1,
        productId: { id: 1 },
        quantity: 5,
        user: { id: 1 },
      };

      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(mockCartItem as any);
      jest
        .spyOn(service['cartItemsRepository'], 'delete')
        .mockResolvedValue(undefined);

      const result = await service.removeItem(1, 1);
      expect(result).toEqual(mockCartItem);
      expect(service['cartItemsRepository'].findOne).toHaveBeenCalledWith({
        where: { productId: { id: 1 }, user: { id: 1 } },
      });
      expect(service['cartItemsRepository'].delete).toHaveBeenCalledWith({
        productId: { id: 1 },
        user: { id: 1 },
      });
    });

    it('should throw BadRequestException if cart item does not exist', async () => {
      jest
        .spyOn(service['cartItemsRepository'], 'findOne')
        .mockResolvedValue(null);

      await expect(service.removeItem(1, 1)).rejects.toThrow(
        /El cart item no existe/,
      );
    });
  });
});
