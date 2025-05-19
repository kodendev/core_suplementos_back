import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashPassword } from './hashPassword';
import { LoginDto } from './dto/login.dto';
import { loginResponse } from './interfaces/login.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await HashPassword.comparePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(loginDto: LoginDto): Promise<loginResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);

    // si el usuario no existe o la contraseña no coincide, lanzamos una excepción
    if (
      !user ||
      !(await HashPassword.comparePassword(
        loginDto.password,
        user.passwordHash,
      ))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // si las credenciales son válidas, generamos un token JWT
    // y lo devolvemos junto con la información del usuario
    const payload = { email: user.email, sub: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: { email: user.email, name: user.name, id: user.id },
    };
  }
}
