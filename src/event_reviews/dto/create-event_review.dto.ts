import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateEventReviewDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsInt()
  rate: number;

  @IsOptional()
  @IsString()
  comment: string;
}
