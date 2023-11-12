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
import { TicketsSoldService } from './tickets_sold.service';
import { CreateTicketsSoldDto } from './dto/create-tickets_sold.dto';
import { UpdateTicketsSoldDto } from './dto/update-tickets_sold.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tickets_sold')
export class TicketsSoldController {
  constructor(private readonly ticketsSoldService: TicketsSoldService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTicketsSoldDto: CreateTicketsSoldDto) {
    return this.ticketsSoldService.create(createTicketsSoldDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.ticketsSoldService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsSoldService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketsSoldDto: UpdateTicketsSoldDto,
  ) {
    return this.ticketsSoldService.update(id, updateTicketsSoldDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsSoldService.remove(id);
  }
}
