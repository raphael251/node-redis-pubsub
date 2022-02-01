import { createClient, RedisClientType } from "redis";

export class RedisClient {
  public client!: RedisClientType<any>
  private subscriber!: RedisClientType<any>

  constructor() {
    this.client = createClient()
    this.client.on('error', () => console.error)
    this.subscriber = this.client.duplicate()
  }

  public async connect() {
    await this.client.connect()
    await this.subscriber.connect()
  }

  public async publish(channel: string, message: any) {
    await this.client.publish(channel, message)
  }

  public async subscribe(channel: string, callback: (message: any) => any) {
    await this.subscriber.subscribe(channel, callback)
  }
}

async function main() {
  const redisClient = new RedisClient()
  await redisClient.connect()

  await redisClient.subscribe('channel', (message) => console.log('aoba > ', message))

  await redisClient.publish('channel', 'ó o salve!')
  await redisClient.publish('channel', 'ó o salve!')
  await redisClient.publish('channel', 'ó o salve!')
}

main()

