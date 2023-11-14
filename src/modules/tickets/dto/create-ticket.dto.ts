import {
  IsUUID,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketsCategory } from 'src/types/ticketsInterface';

export class CreateTicketDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Ticket id (do not pass in the request body)',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Available Quantity',
    type: 'number',
    example: 100,
  })
  @IsNotEmpty()
  @IsInt()
  available_quantity: number;

  @ApiProperty({
    description: 'Ticket category (optional)',
    type: 'enum',
    enum: TicketsCategory,
    example: TicketsCategory.NORMAL,
  })
  @IsOptional()
  @IsEnum(TicketsCategory, { each: true })
  ticket_category: TicketsCategory;

  @ApiProperty({
    description: 'Ticket Price',
    type: 'number',
    example: 29.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Event id associated with the ticket',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsNotEmpty()
  @IsUUID()
  eventId: string;
}
