import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketsSoldDto } from './create-tickets_sold.dto';

export class UpdateTicketsSoldDto extends PartialType(CreateTicketsSoldDto) {}
