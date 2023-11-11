import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: 120 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'icon_url', type: 'varchar', length: 255, nullable: true })
  icon_url: string;

  @Column({ name: 'banner_url', type: 'varchar', length: 255, nullable: true })
  banner_url: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  is_enabled: boolean;

  @Column({ name: 'start_date', type: 'date' })
  start_date: Date;

  @Column({ name: 'end_date', type: 'date' })
  end_date: Date;

  @Column({ name: 'state', type: 'varchar', length: 100 })
  state: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'street', type: 'varchar', length: 100 })
  street: string;

  @Column({ name: 'number', type: 'int' })
  number: number;

  @Column({ name: 'zipcode', type: 'varchar', length: 10 })
  zipcode: string;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
