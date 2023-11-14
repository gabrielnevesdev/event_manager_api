import {
  IsUUID,
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Event ID (Do not pass in the request body)',
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Event title',
    type: 'string',
    example: 'Event Exemple',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Event description',
    type: 'string',
    example: 'A brief description of the event.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Event icon URL (optional)',
    type: 'string',
    example: 'https://example.com/icon.png',
  })
  @IsOptional()
  @IsString()
  icon_url: string;

  @ApiProperty({
    description: 'Event banner URL (optional)',
    type: 'string',
    example: 'https://example.com/banner.jpg',
  })
  @IsOptional()
  @IsString()
  banner_url: string;

  @ApiProperty({
    description: 'Indicates whether the event is enabled',
    type: 'boolean',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_enabled: boolean;

  @ApiProperty({
    description: 'Event start date',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: 'Event end date',
    type: 'string',
    format: 'date-time',
    example: '2023-01-10T23:59:59Z',
  })
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({
    description: 'State where the event takes place',
    type: 'string',
    example: 'Rio de Janeiro',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'City where the event takes place',
    type: 'string',
    example: 'Rio de Janeiro',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Street address of the event',
    type: 'string',
    example: 'Rua test',
  })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({
    description: 'Number of the event location',
    type: 'number',
    example: 123,
  })
  @IsNotEmpty()
  @IsInt()
  number: number;

  @ApiProperty({
    description: 'Zipcode of the event location',
    type: 'string',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  zipcode: string;
}
