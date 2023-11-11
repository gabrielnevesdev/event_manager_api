import { Injectable } from '@nestjs/common';
import { CreateTicketsSoldDto } from './dto/create-tickets_sold.dto';
import { UpdateTicketsSoldDto } from './dto/update-tickets_sold.dto';

@Injectable()
export class TicketsSoldService {
  create(createTicketsSoldDto: CreateTicketsSoldDto) {
    return 'This action adds a new ticketsSale';
  }

  findAll() {
    return `This action returns all ticketsSales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketsSale`;
  }

  update(id: number, updateTicketsSoldDto: UpdateTicketsSoldDto) {
    return `This action updates a #${id} ticketsSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketsSale`;
  }
}
