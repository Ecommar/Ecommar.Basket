import { Injectable } from '@nestjs/common';
import { Basket } from '../entities/basket.entity';

@Injectable()
export class BasketAnalyticsService {
    async getBasketAnalytics(basket: Basket) {
        // Implement analytics logic (e.g., total price, most purchased item)
        return {
            totalPrice: basket.items.reduce((total, item) => total + item.price * item.quantity, 0),
            itemCount: basket.items.length,
        };
    }
}
