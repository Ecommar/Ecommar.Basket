import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redisClient!: Redis; // Use definite assignment assertion

    onModuleInit() {
        // Initialize the Redis client when the module is initialized
        this.redisClient = new Redis({
            host: 'localhost', // Redis server host
            port: 6379,        // Redis server port
        });
    }

    onModuleDestroy() {
        // Disconnect the Redis client when the module is destroyed
        this.redisClient.quit();
    }

    async setBasket(userId: string, basketData: any): Promise<void> {
        await this.redisClient.set(`basket:${userId}`, JSON.stringify(basketData));
    }

    async getBasket(userId: string): Promise<any> {
        const data = await this.redisClient.get(`basket:${userId}`);
        return data ? JSON.parse(data) : null;
    }

    async clearBasket(userId: string): Promise<void> {
        await this.redisClient.del(`basket:${userId}`);
    }
}
