import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/images/entity/image.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class Product {
  @ApiProperty({ example: 1, description: 'Identificador único del producto' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Proteína Whey', description: 'Nombre del producto' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Suplemento de proteína de alta calidad.',
    description: 'Descripción larga del producto',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example: 'Rápida absorción',
    description: 'Descripción corta 1',
  })
  @Column('text')
  smallDescription: string;

  @ApiProperty({
    example: 'Sabor vainilla',
    description: 'Descripción corta 2',
  })
  @Column('text')
  smallDescriptionOne: string;

  @ApiProperty({
    example: 'Incluye aminoácidos',
    description: 'Descripción corta 3',
  })
  @Column('text')
  smallDescriptionTwo: string;

  @ApiProperty({
    example: 'Sin azúcar añadida',
    description: 'Descripción corta 4',
  })
  @Column('text')
  smallDescriptionThree: string;

  @ApiProperty({ example: 599.99, description: 'Precio unitario del producto' })
  @Column('decimal')
  priceUnit: number;

  @ApiProperty({ example: 100, description: 'Cantidad de stock disponible' })
  @Column('int')
  stockQuantity: number;
  @Exclude()
  @ApiProperty({
    example: '2024-04-23T12:34:56.789Z',
    description: 'Fecha de creación automática',
  })
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-23T12:34:56.789Z',
    description: 'Fecha de actualización automática',
  })
  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    example: true,
    description: 'Estado del producto (activo o inactivo)',
  })
  @Column('boolean')
  isActive: boolean;

  @ApiProperty({
    type: () => Category,
    description: 'Categoría a la que pertenece el producto',
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen del producto',
  })
  @Column('text')
  image: string;
  @ApiProperty({
    type: () => Image,
    isArray: true,
    description: 'Imágenes del producto',
  })
  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];
}
