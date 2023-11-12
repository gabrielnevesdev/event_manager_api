import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsSoldService } from './tickets_sold.service';
import { CreateTicketsSoldDto } from './dto/create-tickets_sold.dto';
import { UpdateTicketsSoldDto } from './dto/update-tickets_sold.dto';

@Controller('tickets_sold')
export class TicketsSoldController {
  constructor(private readonly ticketsSoldService: TicketsSoldService) {}

  @Post()
  create(@Body() createTicketsSoldDto: CreateTicketsSoldDto) {
    return this.ticketsSoldService.create(createTicketsSoldDto);
  }

  @Get()
  findAll() {
    return this.ticketsSoldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsSoldService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketsSoldDto: UpdateTicketsSoldDto,
  ) {
    return this.ticketsSoldService.update(id, updateTicketsSoldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsSoldService.remove(id);
  }
}
