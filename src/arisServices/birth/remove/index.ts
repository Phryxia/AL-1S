import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import { removeBirth } from './logic'

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async ({ message }: TextRouterContext) => {
    // todo
    return {
      text: 'todo',
    }
  },
}

export default config
