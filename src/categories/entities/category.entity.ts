import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nombre de la categoría

  @Column({ nullable: true })
  description: string; // Descripción opcional de la categoría

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]; // Relación uno-a-muchos con productos
  @Column({ nullable: true })
  isActive: boolean;
}
