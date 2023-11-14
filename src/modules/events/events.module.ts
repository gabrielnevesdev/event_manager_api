import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { AuthModule } from '../auth/auth.module';
import { ErrorModule } from 'src/errors/error.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    UsersModule,
    AuthModule,
    ErrorModule,
  ],
  controllers: [EventsController],
  exports: [EventsService],
  providers: [EventsService],
})
export class EventsModule {}
