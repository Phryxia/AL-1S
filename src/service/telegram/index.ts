import TelegramBot from 'node-telegram-bot-api'
import { runArisService } from '@src/apps/runArisService'
import { ArisUserRequest } from '@src/types/arisResponse'

function isUserMessage(message: TelegramBot.Message): boolean {
  return !!message.from && !message.from.is_bot
}

function init(): void {
  const token = process.env.TELEGRAM_BOT_TOKEN

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not provided to env')
  }

  const bot = new TelegramBot(token, { polling: true })

  bot.on('message', async (message) => {
    if (!isUserMessage(message)) return

    const response = await runArisService(message as ArisUserRequest)

    if (response?.text) {
      bot.sendMessage(message.chat.id, response.text)
      return
    }
  })
}

export default {
  init,
}
