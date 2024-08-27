import { Injectable } from '@nestjs/common';
import { ApplyDiscountDto } from '../dto/apply-discount.dto';
import { Basket } from '../entities/basket.entity';

@Injectable()
export class BasketDiscountService {
    async applyDiscount(basket: Basket, applyDiscountDto: ApplyDiscountDto): Promise<Basket> {
        // Mock discount logic
        basket.totalPrice = basket.totalPrice * 0.9; // Apply 10% discount
        return basket;
    }
}
