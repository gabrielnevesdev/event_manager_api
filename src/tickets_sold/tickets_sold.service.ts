import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketsSoldDto } from './dto/create-tickets_sold.dto';
import { TicketsSold } from './entities/tickets_sold.entity';
import { JwtPayload } from 'jsonwebtoken';
import { TicketsService } from 'src/tickets/tickets.service';
import { UsersService } from 'src/users/users.service';
import { ErrorService } from 'src/errors/error.service';

@Injectable()
export class TicketsSoldService {
  constructor(
    @InjectRepository(TicketsSold)
    private readonly repository: Repository<TicketsSold>,
    private readonly ticketService: TicketsService,
    private readonly userService: UsersService,
    private readonly erroService: ErrorService,
  ) {}

  async create(
    createTicketsSoldDto: CreateTicketsSoldDto,
    req: JwtPayload,
  ): Promise<TicketsSold> {
    const user = await this.userService.findOne(req.user.sub);
    const ticket = await this.ticketService.findOne(
      createTicketsSoldDto.ticketId,
    );

    if (
      ticket.available_quantity <= 0 ||
      ticket.available_quantity < createTicketsSoldDto.quantity_purchased
    ) {
      throw this.erroService.handleGenericError(
        401,
        'Ticket quantity is not available',
      );
    }

    const ticketSold = this.repository.create({
      ...createTicketsSoldDto,
      total_payment: createTicketsSoldDto.quantity_purchased * ticket.price,
      ticket,
      user,
    });

    ticket.available_quantity -= createTicketsSoldDto.quantity_purchased;
    await this.ticketService.update(ticket.id, ticket);

    return this.repository.save(ticketSold);
  }

  async findAll(
    req: JwtPayload,
    page: number,
    pageSize: number,
  ): Promise<TicketsSold[]> {
    const user = await this.userService.findOne(req.user.sub);
    const queryBuilder = this.repository
      .createQueryBuilder('ts')
      .select(['ts.*', 'event.id'])
      .leftJoin('ticket', 'ticket', 'ticket.id = ts.ticketId')
      .leftJoin('event', 'event', 'ticket.eventId = event.id');

    if (user.role === 'event_owner') {
      return queryBuilder
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .getRawMany();
    }

    return queryBuilder
      .andWhere('ts.userId = :userId', { userId: user.id })
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getRawMany();
  }

  findOne(id: string): Promise<TicketsSold> {
    return this.repository.findOne({ where: { id } });
  }
}
