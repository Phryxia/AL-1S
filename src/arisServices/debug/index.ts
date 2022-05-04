import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async (context: TextRouterContext) => {
    return {
      text: `"${context.message.text}"를 들었습니다.`,
    }
  },
}

export default config
