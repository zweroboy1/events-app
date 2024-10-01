import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'Return all events.',
    type: [Event],
  })
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiResponse({ status: 200, description: 'Return event by ID.', type: Event })
  findOne(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: Event,
  })
  create(@Body() event: Event): Promise<Event> {
    return this.eventService.create(event);
  }
}
