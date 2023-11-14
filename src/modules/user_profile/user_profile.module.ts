import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileService } from './user_profile.service';
import { UserProfileController } from './user_profile.controller';
import { UserProfile } from './entities/user_profile.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ErrorModule } from 'src/errors/error.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    AuthModule,
    UsersModule,
    ErrorModule,
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
