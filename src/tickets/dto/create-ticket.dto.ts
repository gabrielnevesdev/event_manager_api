import {
  IsUUID,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { TicketsCategory } from 'src/types/ticketsInterface';

export class CreateTicketDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsInt()
  available_quantity: number;

  @IsNotEmpty()
  @IsEnum(TicketsCategory, { each: true })
  ticket_category: TicketsCategory;

  @IsOptional()
  @IsNumber()
  price: number;
}
