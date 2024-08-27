import { Injectable } from '@nestjs/common';
import { BasketService } from './basket.service';
import { UpdateProductInBasketDto } from '../dto/update-product-in-basket.dto';

@Injectable()
export class BasketItemService {
    constructor(private readonly basketService: BasketService) { }

    async updateProductInBasket(basketId: string, updateDto: UpdateProductInBasketDto) {
        const basket = await this.basketService.getBasketById(basketId);
        if (!basket) {
            throw new Error('Basket not found');
        }

        const item = basket.items.find(item => item.productId === updateDto.productId);
        if (!item) {
            throw new Error('Product not found in basket');
        }

        item.quantity = updateDto.quantity;
        basket.updatedAt = new Date();

        return basket;
    }

    // Additional methods for removing a product from a basket
}
