import {
  IsUUID,
  IsString,
  IsBoolean,
  IsDate,
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
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
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
