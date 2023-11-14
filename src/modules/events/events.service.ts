import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { ErrorService } from 'src/errors/error.service';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    private readonly errorService: ErrorService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    req: JwtPayload,
  ): Promise<Event> {
    const { sub } = req.user;

    const user = await this.userService.findOne(sub);
    if (user.role !== 'event_owner') {
      throw this.errorService.handleGenericError(
        401,
        'You cannot create events',
      );
    }
    const event = this.repository.create({
      ...createEventDto,
      start_date: new Date(createEventDto.start_date),
      end_date: new Date(createEventDto.end_date),
      user,
    });

    const existingEvent = await this.repository.findOne({
      where: {
        is_enabled: true,
        street: event.street,
        city: event.city,
        state: event.state,
        zipcode: event.zipcode,
        start_date: event.start_date,
      },
    });

    if (existingEvent) {
      throw this.errorService.handleGenericError(
        401,
        'Not allowed to have two active events for the same address',
      );
    }
    return this.repository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.repository.find({ where: { is_enabled: true } });
  }

  async findOne(id: string): Promise<Event> {
    return await this.repository
      .createQueryBuilder('event')
      .select(['event', 'user.id'])
      .where('event.id = :id', { id })
      .leftJoin('event.user', 'user')
      .getOne();
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    req: JwtPayload,
  ): Promise<Event> {
    const { sub } = req.user;

    const event = await this.repository.preload({
      id: id,
      ...updateEventDto,
    });
    if (!event) {
      throw new NotFoundException(`Event not found`);
    }
    const eventWithUser = await this.findOne(id);
    if (sub !== eventWithUser.user.id) {
      throw this.errorService.handleGenericError(
        401,
        'You cannot update this event',
      );
    }
    const existingEvent = await this.repository.findOne({
      where: {
        id: Not(id),
        is_enabled: true,
        street: event.street,
        city: event.city,
        state: event.state,
        zipcode: event.zipcode,
        start_date: event.start_date,
      },
    });

    if (existingEvent) {
      throw this.errorService.handleGenericError(
        401,
        'Not allowed to have two active events for the same address',
      );
    }

    return this.repository.save(event);
  }

  async disabled(id: string, req: JwtPayload) {
    const { sub } = req.user;
    const event = await this.findOne(id);

    if (sub !== event.user.id) {
      throw this.errorService.handleGenericError(
        401,
        'You cannot remove this event',
      );
    }
    event.is_enabled = false;
    return this.repository.save(event);
  }
}
