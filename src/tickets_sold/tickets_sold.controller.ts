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

@Controller('tickets_sold')
export class TicketsSoldController {
  constructor(private readonly ticketsSoldService: TicketsSoldService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createTicketsSoldDto: CreateTicketsSoldDto,
    @Request() req: JwtPayload,
  ) {
    return this.ticketsSoldService.create(createTicketsSoldDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Request() req: JwtPayload,
  ) {
    return this.ticketsSoldService.findAll(req, page, pageSize);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsSoldService.findOne(id);
  }
}
