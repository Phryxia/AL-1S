import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async (context: TextRouterContext) => {
    return {
      text: `아리스는
      
      
      
      
      여긴 되잖아
      
      
      
      
      "${context.message.text}"를 들었습니다.`,
    }
  },
}

export default config
