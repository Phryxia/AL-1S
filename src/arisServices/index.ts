import { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import birthRouter from './birth'
import debugRouter from './debug'

const config: TextRouterConfig = {
  rules: [
    {
      pattern: 'birth',
      childConfig: birthRouter,
    },
    {
      pattern: 'debug',
      childConfig: debugRouter,
    },
  ],
  onMatchedCompletly: async (context: TextRouterContext) => null,
}

export default config
