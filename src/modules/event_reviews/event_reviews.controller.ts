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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Event Reviews')
@Controller('event_reviews')
export class EventReviewsController {
  constructor(private readonly eventReviewsService: EventReviewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event review' })
  @ApiBody({ type: CreateEventReviewDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateEventReviewDto,
  })
  create(
    @Body() createEventReviewDto: CreateEventReviewDto,
    @Request() req: JwtPayload,
  ) {
    return this.eventReviewsService.create(createEventReviewDto, req);
  }

  @Get('/event/:id')
  @ApiOperation({ summary: 'List event reviews for a specific event' })
  @ApiParam({ name: 'id', description: 'Event id' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [CreateEventReviewDto],
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Param('id') id: string,
  ) {
    return this.eventReviewsService.findAll(id, page, pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event review by id' })
  @ApiParam({ name: 'id', description: 'Event Review id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateEventReviewDto,
  })
  findOne(@Param('id') id: string) {
    return this.eventReviewsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event review by id' })
  @ApiParam({ name: 'id', description: 'Event Review id' })
  @ApiBody({ type: CreateEventReviewDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateEventReviewDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateEventReviewDto: UpdateEventReviewDto,
    @Request() req: JwtPayload,
  ) {
    return this.eventReviewsService.update(id, updateEventReviewDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove an event review by id' })
  @ApiParam({ name: 'id', description: 'Event Review id' })
  remove(@Param('id') id: string, @Request() req: JwtPayload) {
    return this.eventReviewsService.remove(id, req);
  }
}
