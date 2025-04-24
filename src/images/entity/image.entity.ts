import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string; // URL de la imagen (esto lo generás al subirla a Cloudinary/S3)

  @Column({ default: false })
  isMain: boolean; // Indica si la imagen es la principal del producto

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn()
  product: Product; // Relación con el producto

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Fecha de creación de la imagen
}
