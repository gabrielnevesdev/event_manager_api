import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class TicketsSold extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity_purchased', type: 'int' })
  quantity_purchased: number;

  @Column({ name: 'total_payment', type: 'decimal', precision: 8, scale: 2 })
  total_payment: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketsSold)
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.ticketsSold)
  user: User;
}
