import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LocationService } from './location.service';

@Injectable()
export class LocationWorker implements OnModuleInit {
  constructor(private readonly locationService: LocationService) {}

  onModuleInit() {
    console.log('LocationWorker listens for RabbitMQ messages...');
  }

  @MessagePattern('location.received')
  async handleLocation(@Payload() locationData: { userId: string; latitude: number; longitude: number }) {
    console.log(`Location taken: ${JSON.stringify(locationData)}`);

    await this.locationService.processLocation(locationData);
  }
}
