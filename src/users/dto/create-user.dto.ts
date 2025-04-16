import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsEnum(['admin', 'final_user', 'wholesaler'])
  @IsNotEmpty()
  readonly role: 'admin' | 'final_user' | 'wholesaler';

  @IsEnum(['active', 'inactive'])
  @IsNotEmpty()
  readonly status: 'active' | 'inactive';
}
