import type TelegramBot from 'node-telegram-bot-api'
import { ArisResponse } from '@src/types/arisResponse'
import { Context, ContextState } from '@src/types/context'

// 유저가 물고있는 컨텍스트에 관련된 정보
interface ContextActivation {
  chatId: TelegramBot.ChatId
  userId: TelegramBot.User['id']
  context: Context
  currentStateId: number
}

const activatedContexts: ContextActivation[] = []

function isUserMessage(message: TelegramBot.Message): boolean {
  return message.from && !message.from.is_bot
}

function processContext(
  message: TelegramBot.Message,
  activation: ContextActivation,
): ArisResponse {
  const currentState = activation.context.states[activation.currentStateId]

  const availableTransition = currentState.transitions.find((transition) =>
    transition.shouldBeTriggered(message),
  )

  if (availableTransition) {
    return availableTransition.onTransition(message)
  }
  currentState.defaultTransition.onTransition(message)
}

function findActivatedContext(message: TelegramBot.Message): ContextActivation | undefined {
  return activatedContexts.find(
    ({ chatId, userId }) => chatId === message.chat.id && userId === message.from.id,
  )
}

export function decideContext(message: TelegramBot.Message): ArisResponse {
  if (!isUserMessage(message)) return null

  const activatedContext = findActivatedContext(message)

  if (activatedContext) {
    return processContext(message, activatedContext)
  }
}
