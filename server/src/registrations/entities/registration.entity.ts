import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../events/entities/event.entity';

export enum RegistrationSource {
  SOCIAL_MEDIA = 'socialMedia',
  FRIENDS = 'friends',
  FOUND_MYSELF = 'foundMyself',
}

@Entity({ name: 'registrations' })
export class Registration {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the registration',
  })
  id: number;

  @ManyToOne(() => Event, (event) => event.registrations)
  @JoinColumn({ name: 'eventId' })
  @ApiProperty({ example: 1, description: 'ID of the registered event' })
  event: Event;

  @ApiProperty({
    example: 1,
    description: 'ID of the registered event',
    type: Number,
  })
  @Column()
  eventId: number;

  @Column()
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the registrant',
  })
  fullName: string;

  @Column()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the registrant',
  })
  email: string;

  @Column('date')
  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the registrant',
  })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: RegistrationSource,
  })
  @ApiProperty({
    example: RegistrationSource.SOCIAL_MEDIA,
    description: 'Source of information about the event',
  })
  source: RegistrationSource;

  @CreateDateColumn()
  @ApiProperty({
    example: '2024-09-30T12:00:00Z',
    description: 'Date and time of registration',
  })
  createdAt: Date;
}
