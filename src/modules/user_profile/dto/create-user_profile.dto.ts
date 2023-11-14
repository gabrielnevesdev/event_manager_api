import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User full name',
    type: 'string',
    example: 'João da Silva',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'Profile image URL (optional)',
    type: 'string',
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  profile_image_url: string;

  @ApiProperty({
    description: 'State',
    type: 'string',
    example: 'Rio de Janeiro',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'City',
    type: 'string',
    example: 'Rio de Janeiro',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Street',
    type: 'string',
    example: 'Rua da Test',
  })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({
    description: 'Residence number',
    type: 'number',
    example: 123,
  })
  @IsNotEmpty()
  @IsInt()
  number: number;

  @ApiProperty({
    description: 'zipcode/postalcode',
    type: 'string',
    example: '01234-567',
  })
  @IsNotEmpty()
  @IsString()
  zipcode: string;
}
