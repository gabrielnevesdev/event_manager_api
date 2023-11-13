import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventReviewDto } from './dto/create-event_review.dto';
import { UpdateEventReviewDto } from './dto/update-event_review.dto';
import { EventReview } from './entities/event_review.entity';
import { UsersService } from 'src/users/users.service';
import { EventsService } from 'src/events/events.service';
import { JwtPayload } from 'jsonwebtoken';
import { ErrorService } from 'src/errors/error.service';

@Injectable()
export class EventReviewsService {
  constructor(
    @InjectRepository(EventReview)
    private readonly repository: Repository<EventReview>,
    private readonly userService: UsersService,
    private readonly eventService: EventsService,
    private readonly errorService: ErrorService,
  ) {}

  async create(
    createEventReviewDto: CreateEventReviewDto,
    req: JwtPayload,
  ): Promise<EventReview> {
    const user = await this.userService.findOne(req.user.sub);
    const event = await this.eventService.findOne(createEventReviewDto.eventId);
    if (!event) {
      throw this.errorService.handleGenericError(401, 'Invalid event');
    }
    if (createEventReviewDto.rate > 5 || createEventReviewDto.rate < 1) {
      throw this.errorService.handleGenericError(
        400,
        'The rate must be from 1 to 5',
      );
    }
    const review = this.repository.create({
      ...createEventReviewDto,
      event,
      user,
    });
    return this.repository.save(review);
  }

  async findAll(
    id: string,
    page: number,
    pageSize: number,
  ): Promise<EventReview[]> {
    return this.repository
      .createQueryBuilder('ew')
      .select(['ew.*'])
      .andWhere('ew.eventId = :eventId', { eventId: id })
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getRawMany();
  }

  findOne(id: string): Promise<EventReview> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateEventReviewDto: UpdateEventReviewDto,
    req: JwtPayload,
  ): Promise<EventReview> {
    const review = await this.repository.preload({
      id: id,
      ...updateEventReviewDto,
    });
    const eventReview = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (eventReview.user.id !== req.user.sub) {
      throw this.errorService.handleGenericError(
        401,
        'You cannot update this review',
      );
    }
    if (!review) {
      throw new NotFoundException(`Review not found`);
    }
    return this.repository.save(review);
  }

  async remove(id: string, req: JwtPayload) {
    const review = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (review.user.id !== req.user.sub) {
      throw this.errorService.handleGenericError(
        401,
        'You cannot delete this review',
      );
    }
    return this.repository.remove(review);
  }
}
