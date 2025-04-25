import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashPassword } from 'src/auth/hashPassword';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Hash the password before saving the user
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('el con este correo ya existe');
    }
    const hashedPassword = await HashPassword.hashPassword(
      createUserDto.passwordHash,
    );
    const userData = {
      ...createUserDto,
      passwordHash: hashedPassword,
    };
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
