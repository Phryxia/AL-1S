import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import assignRouter from './assign'

const config: TextRouterConfig = {
  rules: [
    {
      pattern: 'assign',
      childConfig: assignRouter,
    },
  ],
  onMatchedCompletly: async ({ currentToken }: TextRouterContext) => {
    return {
      text: `아리스는 "${currentToken}"가 뭔지 이해하지 못했습니다.`,
    }
  },
}

export default config
