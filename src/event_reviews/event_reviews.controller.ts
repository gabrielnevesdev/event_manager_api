import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { EventReviewsService } from './event_reviews.service';
import { CreateEventReviewDto } from './dto/create-event_review.dto';
import { UpdateEventReviewDto } from './dto/update-event_review.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'jsonwebtoken';

@Controller('event_reviews')
export class EventReviewsController {
  constructor(private readonly eventReviewsService: EventReviewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createEventReviewDto: CreateEventReviewDto,
    @Request() req: JwtPayload,
  ) {
    return this.eventReviewsService.create(createEventReviewDto, req);
  }

  @Get('/event/:id')
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Param('id') id: string,
  ) {
    return this.eventReviewsService.findAll(id, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventReviewsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventReviewDto: UpdateEventReviewDto,
    @Request() req: JwtPayload,
  ) {
    return this.eventReviewsService.update(id, updateEventReviewDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: JwtPayload) {
    return this.eventReviewsService.remove(id, req);
  }
}
