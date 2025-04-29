export interface JwtPayload {
  sub: number; // El ID del usuario
  name: string; // El nombre de usuario
  role?: string; // El rol del usuario, por ejemplo 'admin', 'user', etc.
  email: string; // El correo electrónico del usuario
  status?: string; // El estado del usuario, por ejemplo 'active', 'inactive'
  iat?: number; // Timestamp de cuando fue emitido el token (opcional)
  exp?: number; // Timestamp de cuando expira el token (opcional)
}
