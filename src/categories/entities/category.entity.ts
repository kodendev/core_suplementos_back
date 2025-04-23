import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la categoría',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Proteínas', description: 'Nombre de la categoría' })
  @Column()
  name: string; // Nombre de la categoría

  @ApiProperty({
    example: 'Suplementos de proteína en polvo',
    description: 'Descripción opcional de la categoría',
    required: false,
  })
  @Column({ nullable: true })
  description: string; // Descripción opcional de la categoría

  @ApiProperty({
    type: () => [Product],
    description: 'Productos asociados a la categoría',
    required: false,
  })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[]; // Relación uno-a-muchos con productos

  @ApiProperty({
    example: true,
    description: 'Indica si la categoría está activa',
    required: false,
  })
  @Column({ nullable: true })
  isActive: boolean;
}
