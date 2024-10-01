import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegistrationSource } from '../entities/registration.entity';

export class CreateRegistrationDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the registrant',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the registrant',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the registrant',
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    enum: RegistrationSource,
    description: 'Source of registration',
  })
  @IsNotEmpty()
  @IsEnum(RegistrationSource)
  source: RegistrationSource;

  @ApiProperty({
    example: 1,
    description: 'ID of the event to which the registration is linked',
  })
  @IsNotEmpty()
  eventId: number;
}
