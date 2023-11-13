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

  @IsOptional()
  @IsEnum(TicketsCategory, { each: true })
  ticket_category: TicketsCategory;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsUUID()
  eventId: string;
}
