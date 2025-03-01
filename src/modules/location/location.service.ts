import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { LocationLog } from '../location-log/location-log.entity';
import { Area } from '../area/area.entity';


@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location) private readonly locationRepo: Repository<Location>,
        @InjectRepository(LocationLog) private readonly logRepo: Repository<LocationLog>,
        @InjectRepository(Area) private readonly areaRepo: Repository<Area>,
    ) { }

    async processLocation(data: { userId: string; latitude: number; longitude: number }) {
        const { userId, latitude, longitude } = data;
        
        if (!userId) {
            console.error("ERROR: userId missing!");
            return;
        }

        if (latitude == null || longitude == null) {
            console.error("ERROR: latitude or longitude is missing!");
            return;
        }
        
        const location = await this.locationRepo.save({ userId, latitude, longitude });
        console.log("Saved in the Locations table:", location);

        const areas = await this.areaRepo.find();
        
        for (const area of areas) {
            const result = await this.areaRepo.query(
                `SELECT id FROM areas WHERE ST_Intersects(
                    geom::geometry, 
                    ST_SetSRID(ST_MakePoint($2, $1), 4326)
                ) LIMIT 1`,
                [latitude, longitude]
              );
              
        
            if (result.length > 0) {
                const log = await this.logRepo.save({
                    userId,
                    areaId: result[0].id,
                    enteredAt: new Date(),
                });

                console.log("Saved in the Location_Log table:", log);
                console.log(`User ${userId} is logged into ${area.name}.`);
            }
        }
    }
}
