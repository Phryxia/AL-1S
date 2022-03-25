import type TelegramBot from 'node-telegram-bot-api'
import { ArisResponse } from '@src/types/arisResponse'

export interface ContextTransition {
  shouldBeTriggered(message: TelegramBot.Message): boolean
  onTransition(message: TelegramBot.Message): ArisResponse
  toId: number
}

export interface ContextState {
  transitions: ContextTransition[]
  defaultTransition: Exclude<ContextTransition, 'shouldBeTriggered'>
}

// 시작 상태는 반드시 0번
export interface Context {
  contextName: string
  states: ContextState[]
}
