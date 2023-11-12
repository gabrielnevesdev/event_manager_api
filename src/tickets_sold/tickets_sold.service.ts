import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketsSoldDto } from './dto/create-tickets_sold.dto';
import { UpdateTicketsSoldDto } from './dto/update-tickets_sold.dto';
import { TicketsSold } from './entities/tickets_sold.entity';

@Injectable()
export class TicketsSoldService {
  constructor(
    @InjectRepository(TicketsSold)
    private readonly repository: Repository<TicketsSold>,
  ) {}

  create(createTicketsSoldDto: CreateTicketsSoldDto): Promise<TicketsSold> {
    const ticket = this.repository.create(createTicketsSoldDto);
    return this.repository.save(ticket);
  }

  findAll(): Promise<TicketsSold[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<TicketsSold> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateTicketsSoldDto: UpdateTicketsSoldDto,
  ): Promise<TicketsSold> {
    const ticket = await this.repository.preload({
      id: id,
      ...updateTicketsSoldDto,
    });
    if (!ticket) {
      throw new NotFoundException(`TicketsSold ${id} not found`);
    }
    return this.repository.save(ticket);
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    return this.repository.remove(ticket);
  }
}
