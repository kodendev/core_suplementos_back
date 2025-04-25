/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as ExtractJwt from 'passport-jwt/lib/extract_jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import 'dotenv/config';
// Esta estrategia se encarga de validar el JWT en cada request
// y de extraer la información del payload para que esté disponible en el request
// (req.user) en los controladores que usen el guard de JWT
// La estrategia se configura para que use el token JWT del header Authorization
// en el formato Bearer <token>
// El token se valida usando la clave secreta definida en el archivo .env
// Si el token es válido, el método validate se ejecuta y retorna el payload

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization: Bearer
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Usá un valor seguro desde .env
    });
  }

  validate(payload: JwtPayload) {
    // Solo se ejecuta si el token es válido
    try {
      return {
        userId: payload.sub,
        username: payload.name,
        role: payload.role,
        email: payload.email,
        status: payload.status,
      };
    } catch (error) {
      console.error('Error validating token:', error);
      throw new UnauthorizedException('Token validation failed'); // Manejo del error con un tipo seguro
    }
  }
}
