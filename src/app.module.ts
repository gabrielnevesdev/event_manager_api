import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventReviewsModule } from './event_reviews/event_reviews.module';
import { TicketsSoldModule } from './tickets_sold/tickets_sold.module';
import { TypeormModule } from './typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeormModule,
    UsersModule,
    UserProfileModule,
    EventsModule,
    TicketsModule,
    EventReviewsModule,
    TicketsSoldModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
