import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsDateString,
} from 'class-validator';
import { OrderItem } from '../../order_items/entities/order_item.entity';
import { CreateOrderItemDto } from '../../order_items/dto/create-order_item.dto';
import { Payment } from '../../payments/entities/payment.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly userId: number; // ID del usuario asociado a la orden

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number; // Monto total de la orden

  @IsEnum(['pending', 'completed', 'shipped', 'cancelled'])
  @IsNotEmpty()
  readonly status: 'pending' | 'completed' | 'shipped' | 'cancelled'; // Estado de la orden

  @IsDateString()
  @IsOptional()
  readonly shippedDate?: string; // Fecha en que se envió la orden (opcional)

  @IsArray()
  @IsNotEmpty()
  readonly orderItems: CreateOrderItemDto[]; // Items de la orden

  @IsNotEmpty()
  readonly payment: Payment; // Pago de la orden
}
