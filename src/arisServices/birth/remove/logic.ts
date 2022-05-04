import { DummyBirths } from '@src/constants'
import { ArisChatId } from '@src/types/arisResponse'

export async function findNearestName(
  chatId: ArisChatId,
  targetName: string,
): Promise<string | undefined> {
  // todo
  return undefined
}

export async function removeBirth(chatId: ArisChatId, targetName: string): Promise<boolean> {
  const index = DummyBirths.findIndex(
    (birth) => birth.chatId === chatId && birth.name === targetName,
  )

  if (index === -1) return false

  if (Math.random() < 0.01) throw new Error('쟌-넨')

  DummyBirths.splice(index, 1)

  return true
}
