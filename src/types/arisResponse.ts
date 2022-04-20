import { MakeRequired } from '@src/utilities/types'
import TelegramBot from 'node-telegram-bot-api'

export type ArisChatId = TelegramBot.ChatId
export type ArisUserId = TelegramBot.User['id']
export type ArisUserRequest = MakeRequired<TelegramBot.Message, 'from'>

export type ArisResponse = {
  text?: string
} | null
