import { Module } from '@nestjs/common';
import { EventReviewsService } from './event_reviews.service';
import { EventReviewsController } from './event_reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventReview } from './entities/event_review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventReview])],
  controllers: [EventReviewsController],
  providers: [EventReviewsService],
})
export class EventReviewsModule {}
