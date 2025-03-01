import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AreaModule } from './modules/area/area.module';
import { LocationModule } from './modules/location/location.module';
import { LocationLogModule } from './modules/location-log/location-log.module';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),    
    AreaModule,
    LocationModule,
    RabbitMQModule,
    LocationLogModule
  ],
})
export class AppModule {}
