import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepo: Repository<Area>,
  ) {}

  async createArea(data: { name: string; boundaries: number[][] }): Promise<Area> {
    const geoJson = {
      type: 'Polygon',
      coordinates: [data.boundaries],
    };

    const area = await this.areaRepo.query(
      `INSERT INTO areas (name, geom) VALUES ($1, ST_GeomFromGeoJSON($2)) RETURNING *`,
      [data.name, JSON.stringify(geoJson)],
    );

    return area[0];
  }

  async getAllAreas(): Promise<Area[]> {
    return this.areaRepo.find();
  }
}
