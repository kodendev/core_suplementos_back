import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { ShipmentsModule } from './shipments/shipments.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoriesModule, OrdersModule, OrderItemsModule, CartItemsModule, ShipmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
