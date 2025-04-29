import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule, // Asegúrate de importar el módulo de usuarios
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // <- ¡esto es importante!
  exports: [AuthService],
})
export class AuthModule {}
