import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { LocationLog } from '../location-log/location-log.entity';
import { AreaModule } from '../area/area.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { LocationWorker } from './location.worker';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, LocationLog]),
    AreaModule,
    RabbitMQModule,
  ],
  controllers: [LocationController],
  providers: [LocationWorker, LocationService],
  exports: [LocationService],
})
export class LocationModule {}
