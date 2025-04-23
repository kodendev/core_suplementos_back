import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; // Importa la entidad Order para establecer la relación

@Entity() // Define que esta clase es una entidad de la base de datos
export class Shipment {
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada envío
  id: number;

  @ManyToOne(() => Order, (order) => order.shipments) // Relación de muchos a uno: cada envío está asociado a una orden
  order: Order;

  @Column({ type: 'timestamp' }) // Define la fecha del envío
  shipmentDate: Date;

  @Column() // Define el nombre del transportista (empresa de envío)
  carrier: string;

  @Column() // Define el número de seguimiento del envío
  trackingNumber: string;

  @Column({
    type: 'enum', // Estado del envío (pendiente, enviado, entregado)
    enum: ['pending', 'shipped', 'delivered'],
  })
  shipmentStatus: 'pending' | 'shipped' | 'delivered';
}
