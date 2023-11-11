import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventReviewsModule } from './event_reviews/event_reviews.module';
import { TicketsSoldModule } from './tickets_sold/tickets_sold.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    UsersModule,
    UserProfileModule,
    EventsModule,
    TicketsModule,
    EventReviewsModule,
    TicketsSoldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
