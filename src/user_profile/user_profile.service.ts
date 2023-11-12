import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { UserProfile } from './entities/user_profile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly repository: Repository<UserProfile>,
  ) {}

  create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    const profile = this.repository.create(createUserProfileDto);
    return this.repository.save(profile);
  }

  findAll(): Promise<UserProfile[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<UserProfile> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const profile = await this.repository.preload({
      id: id,
      ...updateUserProfileDto,
    });
    if (!profile) {
      throw new NotFoundException(`UserProfile ${id} not found`);
    }
    return this.repository.save(profile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    return this.repository.remove(profile);
  }
}
