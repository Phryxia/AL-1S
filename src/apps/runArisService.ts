import ArisServices from '@src/arisServices'
import { ArisChatId, ArisResponse, ArisUserId, ArisUserRequest } from '@src/types/arisResponse'
import { ArisContext, TERMINATE_STATE_ID } from '@src/types/context'
import { routeMessage } from './routeMessage'

// 유저가 물고있는 컨텍스트에 관련된 정보
interface ContextActivation {
  chatId: ArisChatId
  userId: ArisUserId
  context: ArisContext<unknown>
  currentStateId: number
}

let activatedContexts: ContextActivation[] = []

export function addContext<T>(
  chatId: ArisChatId,
  userId: ArisUserId,
  context: ArisContext<T>,
): void {
  activatedContexts.push({
    chatId,
    userId,
    context,
    currentStateId: 0,
  })
}

function removeContext(targetChatId: ArisChatId, targetUserId: ArisUserId): void {
  activatedContexts = activatedContexts.filter(
    ({ chatId, userId }) => !(chatId === targetChatId && userId === targetUserId),
  )
}

function processContext(message: ArisUserRequest, activation: ContextActivation): ArisResponse {
  const currentState = activation.context.states[activation.currentStateId]

  const availableTransition = currentState.transitions.find((transition) =>
    transition.shouldBeTriggered(message),
  )

  if (availableTransition) {
    const nextStateId = availableTransition.toId

    if (nextStateId === TERMINATE_STATE_ID) {
      removeContext(message.chat.id, message.from.id)
    } else {
      activation.currentStateId = nextStateId
    }
    return availableTransition.onTransition(message)
  }
  return currentState.defaultTransition.onTransition(message)
}

function findActivatedContext(message: ArisUserRequest): ContextActivation | undefined {
  return activatedContexts.find(
    ({ chatId, userId }) => chatId === message.chat.id && userId === message.from.id,
  )
}

export async function runArisService(message: ArisUserRequest): Promise<ArisResponse> {
  const activatedContext = findActivatedContext(message)

  if (activatedContext) {
    console.log(activatedContext)
    return processContext(message, activatedContext)
  }

  const tokens = message.text?.split(' ').filter((s) => s) ?? []

  return routeMessage(
    {
      message,
      tokens,
      currentIndex: -1,
      currentToken: tokens[0] ?? '',
    },
    ArisServices,
  )
}
