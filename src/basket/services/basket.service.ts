import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';  // Importing your existing RedisService
import { CreateBasketDto } from '../dto/create-basket.dto';
import { AddProductToBasketDto } from '../dto/add-product-to-basket.dto';
import { UpdateProductInBasketDto } from '../dto/update-product-in-basket.dto';
import { Basket, BasketItem } from '../entities/basket.entity';

@Injectable()
export class BasketService {
    constructor(private readonly redisService: RedisService) { }

    async createBasket(createBasketDto: CreateBasketDto): Promise<Basket> {
        const newBasket: Basket = {
            id: Date.now().toString(),
            userId: createBasketDto.userId,
            items: [],
            totalPrice: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await this.redisService.setBasket(createBasketDto.userId, newBasket);  // Use setBasket to store
        return newBasket;
    }

    async getBasketById(userId: string): Promise<Basket | null> {
        const basket = await this.redisService.getBasket(userId);  // Use getBasket to retrieve
        return basket ? basket : null;
    }

    async addProductToBasket(userId: string, addProductDto: AddProductToBasketDto): Promise<Basket> {
        const basket = await this.getBasketById(userId);
        if (!basket) {
            throw new Error('Basket not found');
        }

        if (!basket.items) {
            basket.items = [];
        }

        const itemIndex = basket.items.findIndex(item => item.productId === addProductDto.productId);
        if (itemIndex >= 0) {
            basket.items[itemIndex].quantity += addProductDto.quantity;
        } else {
            const newItem: BasketItem = {
                productId: addProductDto.productId,
                quantity: addProductDto.quantity,
                price: 10, // Assume a constant price for simplicity
            };
            basket.items.push(newItem);
        }

        basket.totalPrice = basket.items.reduce((total, item) => total + item.price * item.quantity, 0);
        basket.updatedAt = new Date();
        await this.redisService.setBasket(userId, basket);  // Update basket using setBasket
        return basket;
    }

    async updateProductInBasket(userId: string, updateDto: UpdateProductInBasketDto): Promise<Basket> {
        const basket = await this.getBasketById(userId);
        if (!basket) {
            throw new Error('Basket not found');
        }

        const item = basket.items.find(item => item.productId === updateDto.productId);
        if (!item) {
            throw new Error('Product not found in basket');
        }

        item.quantity = updateDto.quantity;
        basket.totalPrice = basket.items.reduce((total, item) => total + item.price * item.quantity, 0);
        basket.updatedAt = new Date();
        await this.redisService.setBasket(userId, basket);  // Update basket using setBasket
        return basket;
    }

    async deleteBasket(userId: string): Promise<void> {
        await this.redisService.clearBasket(userId);  // Use clearBasket to delete
    }

    async clearBasket(userId: string): Promise<Basket> {
        const basket = await this.getBasketById(userId);
        if (!basket) {
            throw new Error('Basket not found');
        }

        basket.items = [];
        basket.totalPrice = 0;
        basket.updatedAt = new Date();
        await this.redisService.setBasket(userId, basket);  // Update basket using setBasket
        return basket;
    }

    // Additional methods can be implemented here (e.g., checkout, save for later)
}
