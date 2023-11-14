import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'jsonwebtoken';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: 200, description: 'Success', type: CreateTicketDto })
  create(@Body() createTicketDto: CreateTicketDto, @Request() req: JwtPayload) {
    return this.ticketsService.create(createTicketDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all tickets' })
  @ApiResponse({ status: 200, description: 'Success', type: [CreateTicketDto] })
  findAll() {
    return this.ticketsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by id' })
  @ApiParam({ name: 'id', description: 'Ticket id' })
  @ApiResponse({ status: 200, description: 'Success', type: CreateTicketDto })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket by id' })
  @ApiParam({ name: 'id', description: 'Ticket id' })
  @ApiBody({ type: UpdateTicketDto })
  @ApiResponse({ status: 200, description: 'Success', type: CreateTicketDto })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }
}
