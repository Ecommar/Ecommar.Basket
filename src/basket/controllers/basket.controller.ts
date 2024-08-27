import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { BasketService } from '../services/basket.service';
import { AddProductToBasketDto } from '../dto/add-product-to-basket.dto';
import { CreateBasketDto } from '../dto/create-basket.dto';

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) { }

    // New endpoint to create a basket for a user
    @Post('create')
    async createBasket(@Body() createBasketDto: CreateBasketDto) {
        return await this.basketService.createBasket(createBasketDto);
    }

    @Post(':userId')
    async addItem(@Param('userId') userId: string, @Body() addProductDto: AddProductToBasketDto) {
        // Use BasketService to add a product to the user's basket
        return await this.basketService.addProductToBasket(userId, addProductDto);
    }

    @Get(':userId')
    async getBasket(@Param('userId') userId: string) {
        // Use BasketService to retrieve the user's basket
        return await this.basketService.getBasketById(userId);
    }

    @Delete(':userId')
    async clearBasket(@Param('userId') userId: string) {
        // Use BasketService to clear the user's basket
        await this.basketService.clearBasket(userId);
        return { message: 'Basket cleared' };
    }
}
