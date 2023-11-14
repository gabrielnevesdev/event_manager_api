import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from 'src/modules/events/events.module';
import { ErrorModule } from 'src/errors/error.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    EventsModule,
    ErrorModule,
    AuthModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
