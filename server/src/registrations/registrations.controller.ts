import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiQuery,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';

import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Registration } from './entities/registration.entity';

@ApiTags('registrations')
@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @ApiCreatedResponse({ description: 'Registration created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateRegistrationDto })
  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return all participants of an event.',
    schema: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: { $ref: '#/components/schemas/CreateRegistrationDto' },
        },
        count: {
          type: 'integer',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async findOne(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Param('id') id: string
  ): Promise<{ users: Registration[]; count: number }> {
    const participants = await this.registrationsService.findOne(
      +id,
      page,
      limit
    );
    return participants;
  }
}
