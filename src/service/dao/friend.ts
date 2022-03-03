import { Friend } from '@src/types'
import { getDb } from '@src/service/repository'

export async function addFriend(friend: Friend): Promise<void> {
  const db = await getDb()
  const friends = db.collection<Friend>('friends')
  await friends.insertOne(friend)
}
