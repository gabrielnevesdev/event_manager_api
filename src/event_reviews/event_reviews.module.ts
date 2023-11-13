import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventReviewsService } from './event_reviews.service';
import { EventReviewsController } from './event_reviews.controller';
import { EventReview } from './entities/event_review.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { ErrorModule } from 'src/errors/error.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventReview]),
    AuthModule,
    UsersModule,
    EventsModule,
    ErrorModule,
  ],
  controllers: [EventReviewsController],
  providers: [EventReviewsService],
})
export class EventReviewsModule {}
