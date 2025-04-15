import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; // Importa la entidad Order para establecer la relación

@Entity() // Define que esta clase es una entidad de la base de datos
export class Payment {
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada pago
  id: number;

  @ManyToOne(() => Order, (order) => order.payments) // Relación de muchos a uno: cada pago está asociado a una orden
  order: Order;

  @Column({ type: 'timestamp' }) // Fecha en que se realizó el pago
  paymentDate: Date;

  @Column({
    type: 'enum', // Define el método de pago utilizado
    enum: ['credit_card', 'mercadopago', 'bank_transfer', 'cash_on_delivery'],
  })
  paymentMethod:
    | 'credit_card'
    | 'mercadopago'
    | 'bank_transfer'
    | 'cash_on_delivery';

  @Column('decimal') // Define el monto pagado en esta transacción
  amount: number;

  @Column({
    type: 'enum', // Estado del pago (pendiente, completado, fallido)
    enum: ['pending', 'completed', 'failed'],
  })
  paymentStatus: 'pending' | 'completed' | 'failed';
}
