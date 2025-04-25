/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as bcrypt from 'bcrypt';

export class HashPassword {
  static async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;

      const hashedPassword: string = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Password hashing failed' + (error as Error).message);
    }
  }
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(
        'Password comparison failed: ' + (error as Error).message,
      );
    }
  }
}
