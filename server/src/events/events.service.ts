import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 12
  ): Promise<{ events: Event[]; count: number }> {
    const result = await this.eventRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { events: result[0], count: result[1] };
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} does not exist`);
    }
    return event;
  }

  async create(event: Event): Promise<Event> {
    return await this.eventRepository.save(event);
  }
}
