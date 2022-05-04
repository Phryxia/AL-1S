import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import { addContext } from '@src/apps/runArisService'
import { createBirthAssignContext } from './context'

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async ({ message }: TextRouterContext) => {
    addContext(message.chat.id, message.from?.id ?? 0, createBirthAssignContext())

    return {
      text: '선생님은 누구의 생일을 챙기고 싶습니까?',
    }
  },
}

export default config
