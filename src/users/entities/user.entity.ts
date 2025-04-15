import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';

@Entity() // Define que esta clase es una entidad de la base de datos
export class User {
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada usuario
  id: number;

  @Column() // Define una columna para el nombre del usuario
  name: string;

  @Column({ unique: true }) // La columna email será única en la base de datos
  email: string;

  @Column() // Almacena la contraseña cifrada del usuario
  passwordHash: string;

  @Column({
    type: 'enum', // Define un campo con valores limitados (enumerados)
    enum: ['admin', 'final_user', 'wholesaler'], // Roles posibles para el usuario
  })
  role: 'admin' | 'final_user' | 'wholesaler'; // Rol del usuario

  @Column({
    type: 'enum', // Define un campo con valores limitados (enumerados)
    enum: ['active', 'inactive'], // Estados posibles del usuario
  })
  status: 'active' | 'inactive'; // Estado del usuario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación automática
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // Fecha de actualización automática
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user) // Relación de uno a muchos: un usuario puede tener múltiples órdenes
  orders: Order[];
  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
}
