import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Category } from '../../categories/entities/category.entity'; // Importa la entidad Category para establecer la relación
import { ManyToOne } from 'typeorm'; // Importa el decorador ManyToOne para establecer relaciones entre entidades
@Entity() // Define que esta clase es una entidad de la base de datos
export class Product {
  @PrimaryGeneratedColumn() // Genera automáticamente un identificador único para cada producto
  id: number;

  @Column() // Define una columna para el nombre del producto
  name: string;

  @Column('text') // Almacena una descripción del producto en texto largo
  description: string;

  @Column('text')
  smallDescription: string;

  @Column('text')
  smallDescriptionOne: string;

  @Column('text')
  smallDescriptionTwo: string;

  @Column('text')
  smallDescriptionThree: string;

  @Column('decimal') // Define el precio unitario del producto
  priceUnit: number;

  @Column('int') // Define la cantidad de stock disponible
  stockQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación automática
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // Fecha de actualización automática
  updatedAt: Date;
  @Column('boolean') // Define el estado del producto (activo o inactivo)
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category; // Relación muchos-a-uno con categoría

  @Column('text') // Define la imagen del producto
  image: string;
}
