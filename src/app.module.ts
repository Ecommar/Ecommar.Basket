import { Module } from '@nestjs/common';
import { RedisService } from './basket/services/redis.service';
import { BasketController } from './basket/controllers/basket.controller';


@Module({
  providers: [RedisService],  // Registering RedisService as a provider
  controllers: [BasketController],  // Registering BasketController
})
export class AppModule { }
