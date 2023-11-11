import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserProfileDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  profile_image_url: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsInt()
  number: number;

  @IsNotEmpty()
  @IsString()
  zipcode: string;
}
