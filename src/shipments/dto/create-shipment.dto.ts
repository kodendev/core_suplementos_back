import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiProperty({ example: 1, description: 'ID de la orden asociada al envío' })
  @IsNotEmpty()
  readonly orderId: number;

  @ApiProperty({
    example: '2024-04-23T12:34:56.789Z',
    description: 'Fecha del envío en formato ISO',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly shipmentDate: string;

  @ApiProperty({ example: 'DHL', description: 'Nombre del transportista' })
  @IsString()
  @IsNotEmpty()
  readonly carrier: string;

  @ApiProperty({
    example: '1Z999AA10123456784',
    description: 'Número de seguimiento',
  })
  @IsString()
  @IsNotEmpty()
  readonly trackingNumber: string;

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'shipped', 'delivered'],
    description: 'Estado del envío',
  })
  @IsEnum(['pending', 'shipped', 'delivered'])
  @IsNotEmpty()
  readonly shipmentStatus: 'pending' | 'shipped' | 'delivered';
}
