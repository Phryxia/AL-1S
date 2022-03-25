import TelegramBot from 'node-telegram-bot-api'
import { runArisService } from '@src/apps/runArisService'

function init(): void {
  const token = process.env.TELEGRAM_BOT_TOKEN

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not provided to env')
  }

  const bot = new TelegramBot(token, { polling: true })

  bot.on('message', async (message) => {
    const response = await runArisService(message)

    if (response?.text) {
      bot.sendMessage(message.chat.id, response.text)
      return
    }
  })
}

export default {
  init,
}
