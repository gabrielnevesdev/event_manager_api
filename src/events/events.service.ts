import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.repository.create(createEventDto);
    return this.repository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Event> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.repository.preload({
      id: id,
      ...updateEventDto,
    });
    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }
    return this.repository.save(event);
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    return this.repository.remove(event);
  }
}
