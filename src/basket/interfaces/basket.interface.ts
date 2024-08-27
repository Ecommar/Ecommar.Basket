import { BasketItem } from "../entities/basket.entity";

export interface Basket {
    id: string;
    userId: string;
    items: BasketItem[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
