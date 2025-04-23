import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'juan@mail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    example: 'admin',
    enum: ['admin', 'final_user', 'wholesaler'],
    description: 'Rol del usuario',
  })
  @IsEnum(['admin', 'final_user', 'wholesaler'])
  @IsNotEmpty()
  readonly role: 'admin' | 'final_user' | 'wholesaler';

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Estado del usuario',
  })
  @IsEnum(['active', 'inactive'])
  @IsNotEmpty()
  readonly status: 'active' | 'inactive';
}
