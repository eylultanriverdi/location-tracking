import { Controller, Get } from '@nestjs/common';
import { LocationLogService } from './location-log.service';
import { Responder } from '../../utils/responder';

@Controller('location_logs')
export class LocationLogController {
  constructor(private readonly locationLogService: LocationLogService) {}

  @Get()
  async getAllLogs(): Promise<any> { 
    try {
      const logs = await this.locationLogService.getAllLogs();
      return Responder.response(200, 'success', 'Loglar başarıyla alındı', logs);
    } catch (error) {
      return Responder.response(500, 'server error', 'Loglar alınırken bir hata oluştu', { error: error.message });
    }
  }
}
