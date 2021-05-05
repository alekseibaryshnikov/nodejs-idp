import { Injectable } from "@nestjs/common";
import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  private redis: RedisClient = createClient();
  private expirationTimeForAuthCode: number = 60 * 60 * 10;
  private expirationTimeForToken: number = 60 * 60 * 12;

  constructor() {
    this.redis.on('error', err => {
      throw Error(`Redis error. ${err}`);
    });
  }

  /**
   * Put token in the cache
   * @param data {userId: Token}
   */
  public setToken(data: KeyValue) {
    this.redis.set(data.key, JSON.stringify(data.value), 'EX', this.expirationTimeForToken);
  }

  /**
   * Put in authcode in the cache
   * @param data AuthCode
   */
  public setAuthcode(data: KeyValue) {
    this.redis.set(data.key, JSON.stringify(data.value), 'EX', this.expirationTimeForAuthCode);
  }

  /**
   * Get authcode from the cache
   * 
   * @param key string
   * @returns Promist<AuthCode>
   */
  public async getAuthcode(key: string): Promise<KeyValue> {
    try {
      return {
        key,
        value: JSON.parse(await this.getAsync(key))
      }
    } catch(err) {
      throw Error(`Redis error. Cant get authcode from it. ${err}`)
    }
  }

  private getAsync(key: string) {
    return promisify(this.redis.get).bind(this.redis, key)
  }
}