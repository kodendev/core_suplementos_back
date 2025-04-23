import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Proteínas', description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional({
    example: 'Suplementos de proteína en polvo',
    description: 'Descripción opcional de la categoría',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si la categoría está activa',
  })
  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}
