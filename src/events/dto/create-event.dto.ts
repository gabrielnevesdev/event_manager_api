import {
  IsUUID,
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateEventDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon_url: string;

  @IsOptional()
  @IsString()
  banner_url: string;

  @IsOptional()
  @IsBoolean()
  is_enabled: boolean;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

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
