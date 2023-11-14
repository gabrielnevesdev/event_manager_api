import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventReviewDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Review id (do not pass in the request body)',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Rating for the event',
    type: 'number',
    example: 4,
  })
  @IsNotEmpty()
  @IsInt()
  rate: number;

  @ApiProperty({
    description: 'Comment about the event (optional)',
    type: 'string',
    example: 'Great event!',
  })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Id of the event being reviewed',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsNotEmpty()
  @IsUUID()
  eventId: string;
}
