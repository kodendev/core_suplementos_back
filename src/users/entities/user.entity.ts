import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
// Swagger decorators:
import { ApiProperty } from '@nestjs/swagger';

@Entity() // Define que esta clase es una entidad de la base de datos
export class User {
  @ApiProperty({ example: 1, description: 'Identificador único del usuario' })
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada usuario
  id: number;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del usuario' })
  @Column() // Define una columna para el nombre del usuario
  name: string;

  @ApiProperty({
    example: 'juan@mail.com',
    description: 'Correo electrónico único del usuario',
  })
  @Column({ unique: true }) // La columna email será única en la base de datos
  email: string;

  @ApiProperty({
    example: '$2b$10$...',
    description: 'Contraseña cifrada del usuario',
  })
  @Column() // Almacena la contraseña cifrada del usuario
  passwordHash: string;

  @ApiProperty({
    example: 'admin',
    enum: ['admin', 'final_user', 'wholesaler'],
    description: 'Rol del usuario',
  })
  @Column({
    type: 'enum', // Define un campo con valores limitados (enumerados)
    enum: ['admin', 'final_user', 'wholesaler'], // Roles posibles para el usuario
  })
  role: 'admin' | 'final_user' | 'wholesaler'; // Rol del usuario

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Estado del usuario',
  })
  @Column({
    type: 'enum', // Define un campo con valores limitados (enumerados)
    enum: ['active', 'inactive'], // Estados posibles del usuario
  })
  status: 'active' | 'inactive'; // Estado del usuario

  @ApiProperty({
    example: '2024-04-23T12:34:56.789Z',
    description: 'Fecha de creación automática',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación automática
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-23T12:34:56.789Z',
    description: 'Fecha de actualización automática',
  })
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
