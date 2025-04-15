import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; // Importa la entidad Order para establecer la relación
import { Product } from '../../products/entities/product.entity'; // Importa la entidad Product para establecer la relación

@Entity() // Define que esta clase es una entidad de la base de datos
export class OrderItem {
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada línea de orden
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems) // Relación de muchos a uno: cada línea de orden pertenece a una orden
  order: Order;

  @ManyToOne(() => Product, (product) => product.id) // Relación de muchos a uno: cada línea de orden está asociada a un producto
  product: Product;

  @Column('int') // Define la cantidad de producto en la línea de orden
  quantity: number;

  @Column('decimal') // Define el precio unitario del producto en la línea de orden
  price: number;

  @Column('decimal') // Define el total de la línea de orden (precio * cantidad)
  total: number;
}
