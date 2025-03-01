import { Controller, Post, Get, Body } from '@nestjs/common';
import { AreaService } from './area.service';
import { Responder } from '../../utils/responder';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @Post()
  async createArea(@Body() data: { name: string; boundaries: number[][] }) {
    try {
      const newArea = await this.areaService.createArea(data);

      return Responder.response(201, 'success', 'Area başarıyla oluşturuldu', newArea);
    } catch (error) {
      return Responder.response(500, 'server error', 'Area oluşturulurken bir hata oluştu', { error: error.message });
    }
  }

  @Get()
  async getAreas() {
    try {
      const areas = await this.areaService.getAllAreas();

      return Responder.response(200, 'success', 'Bütün alanlar başarıyla alındı', areas);
    } catch (error) {
      return Responder.response(500, 'server error', 'Alanlar alınırken bir hata oluştu', { error: error.message });
    }
  }
}
