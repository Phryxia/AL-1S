import type TelegramBot from 'node-telegram-bot-api'
import { ArisResponse } from '@src/types/arisResponse'

export interface ArisContextTransition {
  shouldBeTriggered(message: TelegramBot.Message): boolean
  onTransition(message: TelegramBot.Message): ArisResponse
  toId: number
}

export interface ArisContextState {
  transitions: ArisContextTransition[]
  defaultTransition: Exclude<ArisContextTransition, 'shouldBeTriggered'>
}

// 시작 상태는 반드시 0번
export interface ArisContext {
  contextName: string
  states: ArisContextState[]
}
