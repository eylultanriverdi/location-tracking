import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { LocationService } from './location.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Injectable()
export class LocationWorker implements OnModuleInit {
  constructor(private readonly locationService: LocationService) {}

  onModuleInit() {
    console.log('LocationWorker listens for RabbitMQ messages...');
  }

  @EventPattern('location.received')
  async handleLocation(@Payload() locationData: { userId: string; latitude: number; longitude: number }) {
    console.log('Message received:', locationData);
    await this.locationService.processLocation(locationData);
  }
}
