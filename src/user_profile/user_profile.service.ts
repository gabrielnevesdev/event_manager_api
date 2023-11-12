import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { UserProfile } from './entities/user_profile.entity';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly repository: Repository<UserProfile>,
    private readonly userService: UsersService,
  ) {}

  async create(
    createUserProfileDto: CreateUserProfileDto,
    req: JwtPayload,
  ): Promise<UserProfile> {
    const user = await this.userService.findOne(req.user.sub);
    const newProfile = this.repository.create({
      ...createUserProfileDto,
      user,
    });
    return this.repository.save(newProfile);
  }

  findAll(): Promise<UserProfile[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<UserProfile> {
    return await this.repository
      .createQueryBuilder('user_profile')
      .select(['user_profile', 'user.id'])
      .where('user_profile.id = :id', { id })
      .leftJoin('user_profile.user', 'user')
      .getOne();
  }

  async update(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
    req: JwtPayload,
  ): Promise<UserProfile> {
    const profile = await this.repository.preload({
      id: id,
      ...updateUserProfileDto,
    });
    if (!profile) {
      throw new NotFoundException(`UserProfile ${id} not found`);
    }
    const profileWithUser = await this.findOne(id);
    if (req.user.sub !== profileWithUser.user.id) {
      throw new Error('Invalid Request ');
    }
    return this.repository.save(profile);
  }

  async remove(id: string, req: JwtPayload) {
    const profile = await this.findOne(id);

    if (req.user.sub !== profile.user.id) {
      throw new Error('Invalid Request ');
    }
    return this.repository.remove(profile);
  }
}
