import {
  IsEmail,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../types/userInterface';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'User id (do not pass in the request body)',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Email is a unique field used to login',
    type: 'string',
    example: 'exemplo@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Username generated spliting email before "@" (do not pass in the request body',
    type: 'string',
    example: 'exemplo@test.com -> exemplo',
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User password must be bigger than or equal to 8 characters',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User role (optional)',
    type: 'string',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole, { each: true })
  role: UserRole;
}
