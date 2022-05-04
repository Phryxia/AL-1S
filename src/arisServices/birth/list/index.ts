import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import { getBirthListMessageByChatId } from './logic'

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async ({ message }: TextRouterContext) => {
    const birthList = await getBirthListMessageByChatId(message.chat.id)
    return {
      text: birthList,
    }
  },
}

export default config
