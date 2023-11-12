import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventReviewsService } from './event_reviews.service';
import { CreateEventReviewDto } from './dto/create-event_review.dto';
import { UpdateEventReviewDto } from './dto/update-event_review.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('event_reviews')
export class EventReviewsController {
  constructor(private readonly eventReviewsService: EventReviewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEventReviewDto: CreateEventReviewDto) {
    return this.eventReviewsService.create(createEventReviewDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.eventReviewsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventReviewsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventReviewDto: UpdateEventReviewDto,
  ) {
    return this.eventReviewsService.update(id, updateEventReviewDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventReviewsService.remove(id);
  }
}
