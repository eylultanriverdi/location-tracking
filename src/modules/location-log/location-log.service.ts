import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationLog } from './location-log.entity';

@Injectable()
export class LocationLogService {
  constructor(
    @InjectRepository(LocationLog) private readonly logRepo: Repository<LocationLog>,
  ) {}

  async getAllLogs() {
    const logs = await this.logRepo.find();
    return logs;
}

}

