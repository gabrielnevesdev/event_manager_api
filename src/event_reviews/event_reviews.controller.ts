import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventReviewsService } from './event_reviews.service';
import { CreateEventReviewDto } from './dto/create-event_review.dto';
import { UpdateEventReviewDto } from './dto/update-event_review.dto';

@Controller('event_reviews')
export class EventReviewsController {
  constructor(private readonly eventReviewsService: EventReviewsService) {}

  @Post()
  create(@Body() createEventReviewDto: CreateEventReviewDto) {
    return this.eventReviewsService.create(createEventReviewDto);
  }

  @Get()
  findAll() {
    return this.eventReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventReviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventReviewDto: UpdateEventReviewDto,
  ) {
    return this.eventReviewsService.update(id, updateEventReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventReviewsService.remove(id);
  }
}
