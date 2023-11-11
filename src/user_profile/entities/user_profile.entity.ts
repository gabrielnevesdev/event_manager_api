import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', type: 'varchar', length: 100 })
  full_name: string;

  @Column({
    name: 'profile_image_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profile_image_url: string;

  @Column({ name: 'state', type: 'varchar', length: 100 })
  state: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'street', type: 'varchar', length: 100 })
  street: string;

  @Column({ name: 'number', type: 'int' })
  number: string;

  @Column({ name: 'zipcode', type: 'varchar', length: 10 })
  zipcode: string;

  @OneToOne(() => User, (user) => user.userProfile)
  @JoinColumn()
  user: User;
}
