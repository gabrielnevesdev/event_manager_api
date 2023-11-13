import {
  IsUUID,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateTicketsSoldDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsInt()
  quantity_purchased: number;

  @IsOptional()
  @IsNumber()
  total_payment: number;

  @IsNotEmpty()
  @IsUUID()
  ticketId: string;
}
