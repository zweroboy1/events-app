import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier of the event' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Music Concert', description: 'Title of the event' })
  title: string;

  @Column('text')
  @ApiProperty({
    example: 'A great music concert with live performances.',
    description: 'Description of the event',
  })
  description: string;

  @Column('date')
  @ApiProperty({ example: '2024-09-30', description: 'Date of the event' })
  eventDate: Date;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'Organizer of the event' })
  organizer: string;
}
