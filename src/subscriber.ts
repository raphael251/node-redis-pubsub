import { RedisClient } from "./RedisClient";

RedisClient.getInstance().then(client => client.subscribe('channel1', (message) => {
  console.log('processing on channel 1 >', message)
}))