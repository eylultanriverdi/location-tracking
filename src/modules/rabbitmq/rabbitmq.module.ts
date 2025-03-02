import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOCATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672"],
          queue: 'location_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [], 
  exports: [ClientsModule],
})
export class RabbitMQModule {}
