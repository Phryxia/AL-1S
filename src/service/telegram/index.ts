import TelegramBot from 'node-telegram-bot-api'
import { TextApp } from '@src/utilities'
import birthRouter from './birth'
import debugRouter from './debug'

function init(): void {
  const token = process.env.TELEGRAM_BOT_TOKEN

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not provided to env')
  }

  const bot = new TelegramBot(token, { polling: true })

  const app = new TextApp(bot)
  app.use('birth', birthRouter)
  app.use('debug', debugRouter)
}

export default {
  init,
}
