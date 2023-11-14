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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { JwtPayload } from 'jsonwebtoken';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 200, description: 'Success', type: CreateEventDto })
  @ApiBody({ type: CreateEventDto })
  create(@Body() createEventDto: CreateEventDto, @Request() req: JwtPayload) {
    return this.eventsService.create(createEventDto, req);
  }

  @Get()
  @ApiOperation({ summary: 'List all events' })
  @ApiResponse({ status: 200, description: 'Success', type: [CreateEventDto] })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiParam({ name: 'id', description: 'Event id' })
  @ApiResponse({ status: 200, description: 'Success', type: CreateEventDto })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event by id' })
  @ApiParam({ name: 'id', description: 'Event id' })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({ status: 200, description: 'Success', type: [CreateEventDto] })
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: JwtPayload,
  ) {
    return this.eventsService.update(id, updateEventDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove an event by id' })
  @ApiParam({ name: 'id', description: 'Event id' })
  remove(@Param('id') id: string, @Request() req: JwtPayload) {
    return this.eventsService.disabled(id, req);
  }
}
