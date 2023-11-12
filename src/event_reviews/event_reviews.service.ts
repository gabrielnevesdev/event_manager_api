import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventReviewDto } from './dto/create-event_review.dto';
import { UpdateEventReviewDto } from './dto/update-event_review.dto';
import { EventReview } from './entities/event_review.entity';

@Injectable()
export class EventReviewsService {
  constructor(
    @InjectRepository(EventReview)
    private readonly repository: Repository<EventReview>,
  ) {}

  create(createEventReviewDto: CreateEventReviewDto): Promise<EventReview> {
    const review = this.repository.create(createEventReviewDto);
    return this.repository.save(review);
  }

  findAll(): Promise<EventReview[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<EventReview> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateEventReviewDto: UpdateEventReviewDto,
  ): Promise<EventReview> {
    const review = await this.repository.preload({
      id: id,
      ...updateEventReviewDto,
    });
    if (!review) {
      throw new NotFoundException(`Review ${id} not found`);
    }
    return this.repository.save(review);
  }

  async remove(id: string) {
    const review = await this.findOne(id);
    return this.repository.remove(review);
  }
}
