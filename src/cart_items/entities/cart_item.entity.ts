import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartItem {
  @ApiProperty({
    example: 1,
    description: 'ID único del item en el carrito',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => User,
    description: 'Usuario dueño del ítem en el carrito',
  })
  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({
    type: () => Product,
    description: 'Producto agregado al carrito',
  })
  @ManyToOne(() => Product, { eager: true })
  productId: Product;

  @ApiProperty({
    example: 2,
    description: 'Cantidad de productos agregados al carrito',
  })
  @Column('int')
  quantity: number;

  @ApiProperty({
    example: '2024-04-27T18:21:45.000Z',
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-27T19:15:30.000Z',
    description: 'Fecha de la última actualización del registro',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
