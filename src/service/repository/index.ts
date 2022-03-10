import { Db, MongoClient } from 'mongodb'

const uri = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URI}?retryWrites=true&writeConcern=majority`
const mongoClient = new MongoClient(uri)

let db: Db

export async function getDb(): Promise<Db> {
  if (!db) {
    await mongoClient.connect()
    db = mongoClient.db('al-1s')
  }
  return db
}

export async function closeDb(): Promise<void> {
  await mongoClient.close()
}
