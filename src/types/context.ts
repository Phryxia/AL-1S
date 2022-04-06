import { ArisResponse, ArisUserRequest } from '@src/types/arisResponse'

export interface ArisContextTransition {
  shouldBeTriggered(message: ArisUserRequest): boolean
  onTransition(message: ArisUserRequest): ArisResponse
  toId: number
}

export interface ArisContextState {
  stateName: string
  transitions: ArisContextTransition[]
  defaultTransition: Omit<ArisContextTransition, 'shouldBeTriggered'>
}

// 시작 상태는 반드시 0번
export interface ArisContext<T = {}> {
  contextName: string
  states: ArisContextState[]
  store: T
}

export const TERMINATE_STATE_ID = -1
