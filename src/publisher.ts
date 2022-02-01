import express from 'express'
import { RedisClient } from './RedisClient'

const app = express()

app.use(express.json())

const router = express.Router()

router.post('/channel1', async (req, res) => {
  RedisClient.getInstance().then(client => client.publish('channel1', JSON.stringify(req.body)))
  res.status(200).json({ message: 'Your request will be processed by channel 1' })
})

router.post('/channel2', async (req, res) => {
  RedisClient.getInstance().then(client => client.publish('channel2', JSON.stringify(req.body)))
  res.status(200).json({ message: 'Your request will be processed by channel 2' })
})

app.use('/', router)

app.listen(3000)