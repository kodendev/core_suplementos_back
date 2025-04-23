import { IsNotEmpty, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  readonly orderId: number; // ID de la orden asociada al pago

  @IsDateString()
  @IsNotEmpty()
  readonly paymentDate: string; // Fecha del pago en formato ISO

  @IsEnum(['credit_card', 'mercadopago', 'bank_transfer', 'cash_on_delivery'])
  @IsNotEmpty()
  readonly paymentMethod:
    | 'credit_card'
    | 'mercadopago'
    | 'bank_transfer'
    | 'cash_on_delivery'; // Método de pago

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number; // Monto del pago

  @IsEnum(['pending', 'completed', 'failed'])
  @IsNotEmpty()
  readonly paymentStatus: 'pending' | 'completed' | 'failed'; // Estado del pago
}
