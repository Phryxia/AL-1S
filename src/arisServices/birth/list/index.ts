import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import { getBirthlistByChatId } from './logic'

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async ({ message }: TextRouterContext) => {
    const birthList = await getBirthlistByChatId(message.chat.id)
    return {
      text: birthList,
    }
  },
}

export default config
