import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsSoldService } from './tickets_sold.service';
import { TicketsSoldController } from './tickets_sold.controller';
import { TicketsSold } from './entities/tickets_sold.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { TicketsModule } from 'src/modules/tickets/tickets.module';
import { ErrorModule } from 'src/errors/error.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsSold]),
    AuthModule,
    UsersModule,
    TicketsModule,
    ErrorModule,
  ],
  controllers: [TicketsSoldController],
  providers: [TicketsSoldService],
})
export class TicketsSoldModule {}
