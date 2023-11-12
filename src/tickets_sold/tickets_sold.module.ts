import { Module } from '@nestjs/common';
import { TicketsSoldService } from './tickets_sold.service';
import { TicketsSoldController } from './tickets_sold.controller';
import { TicketsSold } from './entities/tickets_sold.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TicketsSold])],
  controllers: [TicketsSoldController],
  providers: [TicketsSoldService],
})
export class TicketsSoldModule {}
