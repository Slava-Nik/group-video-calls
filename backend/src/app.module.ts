import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsCallsGateway } from './calls/events-calls.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventsCallsGateway],
})
export class AppModule {}
