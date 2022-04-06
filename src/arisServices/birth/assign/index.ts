import type { TextRouterConfig, TextRouterContext } from '@src/apps/routeMessage'
import * as FriendDAO from '@src/service/dao/friend'

async function assignBirth(name: string, birthday: Date): Promise<void> {
  FriendDAO.addFriend({
    name,
    birthday,
    waifus: [],
  })
}

const config: TextRouterConfig = {
  rules: [],
  onMatchedCompletly: async ({ currentToken }: TextRouterContext) => {
    if (!currentToken) {
      return {
        text: '아리스는 아무것도 듣지 못했습니다.',
      }
    }

    try {
      await assignBirth(currentToken, new Date())

      return {
        text: `아리스는 이해했습니다.\n당신의 이름은 ${currentToken}입니다.`,
      }
    } catch (error) {
      return {
        text: `오류 발생! 아리스의 머리가 어지럽습니다.\n${error}`,
      }
    }
  },
}

export default config
