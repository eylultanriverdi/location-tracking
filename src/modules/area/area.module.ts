import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { Area } from './area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Area]),
  ],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [TypeOrmModule.forFeature([Area])],
})
export class AreaModule {}



