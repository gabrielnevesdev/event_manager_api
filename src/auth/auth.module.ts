// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRATION_TIME },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
