import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventReviewsService } from './event_reviews.service';
import { EventReviewsController } from './event_reviews.controller';
import { EventReview } from './entities/event_review.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventReview]), AuthModule],
  controllers: [EventReviewsController],
  providers: [EventReviewsService],
})
export class EventReviewsModule {}
