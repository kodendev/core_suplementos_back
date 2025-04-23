import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly userId: number; // ID del usuario asociado a la orden

  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number; // Monto total de la orden

  @IsEnum(['pending', 'completed', 'shipped'])
  @IsNotEmpty()
  readonly status: 'pending' | 'completed' | 'shipped'; // Estado de la orden

  @IsDateString()
  @IsOptional()
  readonly shippedDate?: string; // Fecha en que se envió la orden (opcional)
}
