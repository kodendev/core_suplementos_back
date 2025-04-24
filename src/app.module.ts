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
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './images/image.module';
console.log('DB_HOST', process.env.DB_HOST);
console.log('DB_PORT', process.env.DB_PORT);
console.log('DB_USERNAME', process.env.DB_USERNAME);
console.log('DB_PASSWORD', process.env.DB_PASSWORD);
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderItemsModule,
    CartItemsModule,
    ShipmentsModule,
    ImageModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.28.226.196',
      port: 5432,
      username: 'gfreddi',
      password: 'GFdev2024%%',
      database: 'core_suplementos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entities
      synchronize: true,
      logging: true,
    }),
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
