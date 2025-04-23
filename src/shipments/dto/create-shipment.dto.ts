import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateShipmentDto {
  @IsNotEmpty()
  readonly orderId: number; // ID de la orden asociada al envío

  @IsDateString()
  @IsNotEmpty()
  readonly shipmentDate: string; // Fecha del envío en formato ISO

  @IsString()
  @IsNotEmpty()
  readonly carrier: string; // Nombre del transportista

  @IsString()
  @IsNotEmpty()
  readonly trackingNumber: string; // Número de seguimiento

  @IsEnum(['pending', 'shipped', 'delivered'])
  @IsNotEmpty()
  readonly shipmentStatus: 'pending' | 'shipped' | 'delivered'; // Estado del envío
}
