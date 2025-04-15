import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Importa la entidad User para establecer la relación
import { OrderItem } from 'src/order_items/entities/order_item.entity'; // Importa la entidad Payment para establecer la relación
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { Payment } from 'src/payments/entities/payment.entity'; // Importa la entidad Payment para establecer la relación

@Entity() // Define que esta clase es una entidad de la base de datos
export class Order {
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada orden
  id: number;

  @ManyToOne(() => User, (user) => user.orders) // Relación de muchos a uno: una orden pertenece a un usuario
  user: User;

  @Column('decimal') // Define el monto total de la orden
  totalAmount: number;

  @Column({
    type: 'enum', // Estado de la orden (pendiente, completada, enviada)
    enum: ['pending', 'completed', 'shipped'],
  })
  status: 'pending' | 'completed' | 'shipped';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación de la orden
  orderDate: Date;

  @Column({ type: 'timestamp', nullable: true }) // Fecha en que se envió la orden (opcional)
  shippedDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order) // Relación de uno a muchos: una orden tiene múltiples productos
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order) // Relación de uno a muchos: una orden puede tener múltiples pagos
  payments: Payment[];

  @OneToMany(() => Shipment, (shipment) => shipment.order) // Relación de uno a muchos: una orden puede tener múltiples envíos
  shipments: Shipment[];
}
