import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { RedisService } from '../services/redis.service';

@Controller('basket')
export class BasketController {
    constructor(private readonly redisService: RedisService) { }

    @Post(':userId')
    async addItem(@Param('userId') userId: string, @Body() item: any) {
        // Get the current basket for the user, or initialize an empty array if none exists
        let basket = await this.redisService.getBasket(userId);
        basket = basket ? basket : [];
        basket.push(item);  // Add the item to the basket
        await this.redisService.setBasket(userId, basket);  // Save the updated basket
        return basket;  // Return the updated basket
    }

    @Get(':userId')
    async getBasket(@Param('userId') userId: string) {
        return await this.redisService.getBasket(userId);  // Retrieve and return the basket for the user
    }

    @Delete(':userId')
    async clearBasket(@Param('userId') userId: string) {
        await this.redisService.clearBasket(userId);  // Clear the basket for the user
        return { message: 'Basket cleared' };  // Return a confirmation message
    }
}
