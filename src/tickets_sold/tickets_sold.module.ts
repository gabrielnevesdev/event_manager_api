import { Module } from '@nestjs/common';
import { TicketsSoldService } from './tickets_sold.service';
import { TicketsSoldController } from './tickets_sold.controller';

@Module({
  controllers: [TicketsSoldController],
  providers: [TicketsSoldService],
})
export class TicketsSoldModule {}
