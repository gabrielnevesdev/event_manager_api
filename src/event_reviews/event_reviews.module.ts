import { Module } from '@nestjs/common';
import { EventReviewsService } from './event_reviews.service';
import { EventReviewsController } from './event_reviews.controller';

@Module({
  controllers: [EventReviewsController],
  providers: [EventReviewsService],
})
export class EventReviewsModule {}
