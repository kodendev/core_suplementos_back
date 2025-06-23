import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    // EXAMPLE OF THE REQUEST BODY

    /*
    http://localhost:3000/orders
    {
      "userId": 1,
      "totalAmount": 100,
      "status": "pending",
      "shippedDate": "2021-01-01",
      "orderItems": [
        {
          "productId": 1,
          "quantity": 1,
          "price": 100
        }
      ],
      "payment": {
        "paymentDate": "2021-01-01",
        "paymentMethod": "credit_card",
        "amount": 100,
        "status": "pending"
      }
    }
    */
    console.log('--------------------------------');
    console.log('this is the createOrderDto');
    console.log(createOrderDto);
    console.log('--------------------------------');
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
