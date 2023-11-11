import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { TicketsCategory } from 'src/types/ticketsInterface';
import { TicketsSold } from 'src/tickets_sold/entities/tickets_sold.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'available_quantity', type: 'int' })
  available_quantity: number;

  @Column({
    name: 'ticket_category',
    type: 'enum',
    enum: TicketsCategory,
    default: TicketsCategory.NORMAL,
  })
  ticket_category: TicketsCategory;

  @Column({ name: 'price', type: 'decimal', precision: 8, scale: 2 })
  price: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @OneToMany(() => TicketsSold, (ticketSold) => ticketSold.ticket)
  ticketsSold: TicketsSold[];
}
