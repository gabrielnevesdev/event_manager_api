import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UserProfileModule } from './modules/user_profile/user_profile.module';
import { EventsModule } from './modules/events/events.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { EventReviewsModule } from './modules/event_reviews/event_reviews.module';
import { TicketsSoldModule } from './modules/tickets_sold/tickets_sold.module';
import { TypeormModule } from './db/typeorm.module';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorModule } from './errors/error.module';

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
    ErrorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
