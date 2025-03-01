import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LocationService } from './location.service';
import { Responder } from '../../utils/responder';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    @Inject('LOCATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async sendLocation(
    @Body() locationData: { userId: string; latitude: number; longitude: number }
  ): Promise<any> {
    try {
      this.client.emit('location.received', locationData);

      await this.locationService.processLocation(locationData);

      return Responder.response(201, 'success', 'Konum alındı, işlenmek üzere kuyruğa eklendi', {
        userId: locationData.userId,
      });

    } catch (error) {
      return Responder.response(500, 'server error', 'Bir hata oluştu', { error: error.message });
    }
  }
}
