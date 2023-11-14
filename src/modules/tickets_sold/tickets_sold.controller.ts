import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TicketsSoldService } from './tickets_sold.service';
import { CreateTicketsSoldDto } from './dto/create-tickets_sold.dto';
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

@ApiBearerAuth()
@ApiTags('Tickets Sold')
@Controller('tickets_sold')
export class TicketsSoldController {
  constructor(private readonly ticketsSoldService: TicketsSoldService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new ticket sold' })
  @ApiBody({ type: CreateTicketsSoldDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateTicketsSoldDto,
  })
  create(
    @Body() createTicketsSoldDto: CreateTicketsSoldDto,
    @Request() req: JwtPayload,
  ) {
    return this.ticketsSoldService.create(createTicketsSoldDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all tickets sold' })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', type: Number, required: false, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [CreateTicketsSoldDto],
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Request() req: JwtPayload,
  ) {
    return this.ticketsSoldService.findAll(req, page, pageSize);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket sold by id' })
  @ApiParam({ name: 'id', description: 'Ticket Sold id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateTicketsSoldDto,
  })
  findOne(@Param('id') id: string) {
    return this.ticketsSoldService.findOne(id);
  }
}
