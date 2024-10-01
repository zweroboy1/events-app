import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async findAll(page: number = 1, limit: number = 12): Promise<{ events: Event[], count: number }> {
    const result = await this.eventRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { events: result[0], count: result[1] };
  }

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async create(event: Event): Promise<Event> {
    return await this.eventRepository.save(event);
  }
}
