import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Event } from '../../events/entities/event.entity';
import { UserProfile } from '../../user_profile/entities/user_profile.entity';
import { UserRole } from '../../../types/userInterface';
import { TicketsSold } from '../../tickets_sold/entities/tickets_sold.entity';
import { EventReview } from '../../event_reviews/entities/event_review.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 120, unique: true })
  email: string;

  @Column({ name: 'username', type: 'varchar', length: 80, unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => TicketsSold, (ticketSold) => ticketSold.ticket)
  ticketsSold: TicketsSold[];

  @OneToMany(() => EventReview, (review) => review.user)
  reviews: EventReview[];

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const saltRounds = Number(process.env.SALTROUNDS);
      this.password = await hash(this.password, saltRounds);
    }
  }

  @BeforeInsert()
  async generateUsername() {
    if (this.email) {
      this.username = this.email.split('@')[0];
    }
  }
}
