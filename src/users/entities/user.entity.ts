import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Event } from '../../events/entities/event.entity';
import { UserProfile } from '../../user_profile/entities/user_profile.entity';
import { UserRole } from '../../types/userInterface';
import { TicketsSold } from 'src/tickets_sold/entities/tickets_sold.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 120 })
  email: string;

  @Column({ name: 'username', type: 'varchar', length: 80 })
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

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = Number(process.env.SALTROUNDS);
      this.password = await hash(this.password, saltRounds);
    }
  }
}
