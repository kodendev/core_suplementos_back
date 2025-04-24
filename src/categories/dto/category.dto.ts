import { IsString, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class CategoryDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;
}
