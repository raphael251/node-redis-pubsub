import { RedisClient } from "./RedisClient"

async function main() {
  const redisClient = await RedisClient.getInstance()

  await redisClient.subscribe('channel', (message) => console.log('aoba > ', message))

  await redisClient.publish('channel', 'ó o salve!')
  await redisClient.publish('channel', 'ó o salve!')
  await redisClient.publish('channel', 'ó o salve!')
}

main()