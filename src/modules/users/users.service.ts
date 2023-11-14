import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import { ErrorService } from '../../errors/error.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly errorService: ErrorService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password.length < 8) {
      throw this.errorService.handleGenericError(
        400,
        'Password must be bigger than or equal to 8 characters',
      );
    }
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email', 'user.role'])
      .getMany();
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'email', 'username', 'role'],
    });
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    req: JwtPayload,
  ): Promise<User> {
    if (req.user.sub != id) {
      throw this.errorService.handleGenericError(
        401,
        'you do not own this user',
      );
    }

    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (updateUserDto.password) {
      const hashedPassword = await hash(
        updateUserDto.password,
        Number(process.env.SALTROUNDS),
      );
      user.password = hashedPassword;
    }
    user.username = updateUserDto.username || user.username;
    user.email = updateUserDto.email || user.email;
    user.role = updateUserDto.role || user.role;

    return this.repository.save(user);
  }

  async remove(id: string, req: JwtPayload) {
    if (req.user.sub !== id) {
      throw this.errorService.handleGenericError(
        401,
        'you do not own this user',
      );
    }
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
