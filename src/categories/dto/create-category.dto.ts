import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description?: string;
  @IsBoolean()
  readonly isActive?: boolean;
}
