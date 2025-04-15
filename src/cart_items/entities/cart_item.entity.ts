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

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: 'CASCADE' })
  user: User; // Usuario dueño del ítem en el carrito

  @ManyToOne(() => Product, { eager: true }) // Relación con el producto
  // { eager: true } significa que el producto se carga automáticamente al cargar el carrito
  // sin necesidad de hacer una consulta adicional
  product: Product; // Producto añadido al carrito

  @Column('int')
  quantity: number; // Cantidad del producto en el carrito

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
