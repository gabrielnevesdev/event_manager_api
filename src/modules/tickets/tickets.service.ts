import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { EventsService } from 'src/modules/events/events.service';
import { ErrorService } from 'src/errors/error.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly repository: Repository<Ticket>,
    private readonly eventService: EventsService,
    private readonly errorService: ErrorService,
  ) {}

  async create(
    createTicketDto: CreateTicketDto,
    req: JwtPayload,
  ): Promise<Ticket> {
    const event = await this.eventService.findOne(createTicketDto.eventId);
    if (event.user.id !== req.user.sub) {
      throw this.errorService.handleGenericError(
        401,
        'You cannot add more tickets',
      );
    }

    if (!event.is_enabled) {
      throw this.errorService.handleGenericError(
        401,
        'Not allowed to create tickets for not enabled events',
      );
    }
    const ticket = this.repository.create({ ...createTicketDto, event });
    return this.repository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Ticket> {
    return await this.repository
      .createQueryBuilder('ticket')
      .select(['ticket', 'event.id'])
      .where('ticket.id = :id', { id })
      .leftJoin('ticket.event', 'event')
      .getOne();
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.repository.preload({
      id: id,
      ...updateTicketDto,
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket not found`);
    }
    return this.repository.save(ticket);
  }
}
