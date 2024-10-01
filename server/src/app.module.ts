import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    EventsModule,

    RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
