import { TextRouter } from '@src/utilities'
import * as FriendDAO from '@src/service/dao/friend'

async function assignBirth(name: string, birthday: Date): Promise<void> {
  FriendDAO.addFriend({
    name,
    birthday,
    waifus: [],
  })
}

const router = new TextRouter(({ bot, message, remainText }) => {
  if (remainText) {
    assignBirth(remainText, new Date())
      .then(() => {
        bot.sendMessage(
          message.chat.id,
          `아리스는 이해했습니다.\n당신의 이름은 ${remainText}입니다.`,
        )
      })
      .catch((error) => {
        bot.sendMessage(message.chat.id, `오류 발생! 아리스의 머리가 어지럽습니다.\n${error}`)
      })
    return
  }

  bot.sendMessage(message.chat.id, `아리스는 당신의 이름을 알고 싶습니다.`)
})

export default router
