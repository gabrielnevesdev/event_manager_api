import {
  IsUUID,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketsSoldDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Ticket sold id (do not pass in the request body)',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Quantity purchased',
    type: 'number',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  quantity_purchased: number;

  @ApiProperty({
    description: 'Total Payment (do not pass in the request body)',
    type: 'number',
    example: 20.0,
  })
  @IsOptional()
  @IsNumber()
  total_payment: number;

  @ApiProperty({
    description: 'Ticket id associated with the sale',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsNotEmpty()
  @IsUUID()
  ticketId: string;
}
