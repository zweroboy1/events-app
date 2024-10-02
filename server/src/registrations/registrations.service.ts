import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { Event } from '../events/entities/event.entity';
@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) { }

  async create(
    createRegistrationDto: CreateRegistrationDto
  ): Promise<Registration> {
    const { eventId, email } = createRegistrationDto;

    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new BadRequestException(`Event with ID ${eventId} does not exist`);
    }

    if (event.eventDate < new Date()) {
      throw new BadRequestException(
        `Event with ID ${eventId} has already started or finished`
      );
    }

    const existingRegistration = await this.registrationRepository.findOne({
      where: { event: { id: eventId }, email },
    });
    if (existingRegistration) {
      throw new BadRequestException(`User with email ${email} is already registered for event with ID ${eventId}`);
    }

    const registration = this.registrationRepository.create(
      createRegistrationDto
    );
    return this.registrationRepository.save(registration);
  }

  findAll() {
    return `This action returns all registrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }
  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
