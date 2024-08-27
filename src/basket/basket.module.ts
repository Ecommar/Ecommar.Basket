// basket.module.ts
import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { BasketController } from './controllers/basket.controller';
import { BasketService } from './services/basket.service';
import { BasketItemService } from './services/basket-item.service';
import { BasketAnalyticsService } from './services/basket-analytics.service';
import { BasketDiscountService } from './services/basket-discount.service';

@Module({
    providers: [
        RedisService,
        BasketService,
        BasketItemService,
        BasketAnalyticsService,
        BasketDiscountService,
    ],
    controllers: [BasketController],
})
export class BasketModule { }
