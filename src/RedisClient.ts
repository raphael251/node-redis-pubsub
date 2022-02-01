import { createClient, RedisClientType } from "redis";

export class RedisClient {
  private client!: RedisClientType<any>
  private subscriber!: RedisClientType<any>
  private static instance: RedisClient

  constructor() {
    this.client = createClient()
    this.client.on('error', () => console.error)
    this.subscriber = this.client.duplicate()
  }

  private async connect() {
    await this.client.connect()
    await this.subscriber.connect()
  }

  public static async getInstance(): Promise<RedisClient> {
    if (this.instance) return this.instance
    this.instance = new RedisClient()
    await this.instance.connect()
    return this.instance
  }

  public async publish(channel: string, message: string) {
    await this.client.publish(channel, message)
  }

  public async subscribe(channel: string, callback: (message: string) => void) {
    await this.subscriber.subscribe(channel, callback)
  }
}
