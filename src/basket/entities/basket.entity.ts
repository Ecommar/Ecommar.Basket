export class Basket {
    id!: string;
    userId!: string;
    items: BasketItem[] = [];
    totalPrice!: number;
    createdAt!: Date;
    updatedAt!: Date;
}

export class BasketItem {
    productId!: string;
    quantity!: number;
    price!: number;
}
