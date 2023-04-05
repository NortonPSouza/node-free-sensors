import {createClient, RedisClientType} from "redis";

export class RedisHelper {

    private redis: RedisClientType

    constructor() {
        this.redis = createClient({url: "redis://north.streamdata.com.br:6379", password: "kgb8y2kk"});
    }

    public async initConnection(): Promise<void> {
        await this.redis.connect();
        this.redis.on('connect', () => console.log('Redis Client is connected to use'));
        this.redis.on('error', err => console.log('Redis Client Error', err));
    }

    public async getAll(): Promise<string[]>{
        return this.redis.keys("*" as any);
    }

    public async delete(key: string): Promise<void>{
        await this.redis.del(key as any);
    }

    public async disconnect(): Promise<void> {
        await this.redis.disconnect();
    }

}