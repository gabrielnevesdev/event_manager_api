import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsSoldService } from './tickets_sold.service';
import { TicketsSoldController } from './tickets_sold.controller';
import { TicketsSold } from './entities/tickets_sold.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketsSold]), AuthModule],
  controllers: [TicketsSoldController],
  providers: [TicketsSoldService],
})
export class TicketsSoldModule {}
