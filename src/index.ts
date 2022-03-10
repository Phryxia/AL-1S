import express from 'express'
import TelegramBotService from './service/telegram'
import type { Request, Response, NextFunction } from 'express'
import { getDb } from './service/repository'

const app = express()
app.use(express.json())
const port = 8080

app.get('/', (req, res) => {
  res.json({
    message: '안녕 아리스!',
    version: '0.0.5',
    ip: req.headers['x-forwarded-for'] || req.ip,
  })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err?.message ?? '',
    stack: err?.stack ?? '',
  })
})

app.listen(port, () => {
  console.log(`AL-1S is on listening on ${port}`)
})
;(async () => {
  try {
    await getDb()
    TelegramBotService.init()
  } catch (e) {
    console.error(e)
  }
})()
