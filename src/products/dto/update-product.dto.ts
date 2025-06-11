import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  categoryId?: number | undefined; // Optional field for category ID DEFINI MAL EL CAMPO DE ENTRADA SE DEBHIA LLAMAR CATEGORYID HAY Q CAMBIARLO ANTES DE LANZARLO A PROD
}
