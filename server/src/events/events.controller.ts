import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'Return all events.',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Event',
          },
        },
        count: {
          type: 'integer',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 12
  ): Promise<{ events: Event[]; count: number }> {
    const eventsResult = await this.eventService.findAll(page, limit);
    return eventsResult;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiResponse({ status: 200, description: 'Return event by ID.', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async findOne(@Param('id') id: number): Promise<Event> {
    const event = await this.eventService.findOne(id);
    return event;
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
