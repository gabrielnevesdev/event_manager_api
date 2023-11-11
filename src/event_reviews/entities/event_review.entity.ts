import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class EventReview extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rate', type: 'int' })
  rate: number;

  @Column({ name: 'comment', type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => Event, (event) => event.reviews)
  event: Event;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
