import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationLogController } from './location-log.controller';
import { LocationLogService } from './location-log.service';
import { LocationLog } from './location-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationLog])],
  controllers: [LocationLogController],
  providers: [LocationLogService],
})
export class LocationLogModule {}
