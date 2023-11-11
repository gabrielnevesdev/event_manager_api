import {
  IsEmail,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../types/users';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
