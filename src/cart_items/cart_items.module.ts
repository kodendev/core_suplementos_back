import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { CartItem } from './entities/cart_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
  imports: [TypeOrmModule.forFeature([CartItem, Product, User])],
})
export class CartItemsModule {}
