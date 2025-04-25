import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { loginResponse } from './interfaces/login.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' }) // Esta línea es opcional, pero ayuda a documentar la operación
  @ApiBody({ type: LoginDto }) // Aquí especificamos el tipo de datos que esperamos en el cuerpo de la solicitud
  @ApiResponse({ status: 201, description: 'User logged in successfully.' }) // Respuesta exitosa
  @ApiResponse({ status: 401, description: 'Invalid credentials.' }) // Respuesta de error
  async login(@Body() loginDto: LoginDto): Promise<loginResponse> {
    return this.authService.login(loginDto);
  }
}
