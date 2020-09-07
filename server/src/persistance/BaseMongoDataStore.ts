import { MongoClient, Db, WithId } from 'mongodb'

type Item = {[key: string]: any} & {id: string}
export type PersistedItem<T extends Item> = WithId<Omit<T, 'id'>>

export function sanitise<T extends Item>(item: null, ...additionalIds: (keyof T)[]): null
export function sanitise<T extends Item>(item: PersistedItem<T>, ...additionalIds: (keyof T)[]): T
export function sanitise<T extends Item>(item: PersistedItem<T> | null, ...additionalIds: (keyof T)[]): T | null

export function sanitise<T extends Item>(item: PersistedItem<T> | null, ...additionalIds: (keyof T)[]): T | null {
  if(!item) return null
  const {_id, ...noId} = item
  const returnValue: any = {...noId, id: (_id as any).toString()}
  additionalIds.forEach(id => {
    returnValue[id] = returnValue[id]?.toString()
  })
  return returnValue
}

export function sanitiseArray<T extends Item>(items: PersistedItem<T>[], ...additionalIds: (keyof T)[]): T[] {
  return items.map(i => sanitise(i, ...additionalIds))
}

export default abstract class BaseMongoDataStore {
  private _connection: Promise<MongoClient>

  constructor(url: string) {
    this._connection = MongoClient.connect(url)
  }

  protected async withDatabase<T>(callback: (db: Db) => T | Promise<T>): Promise<T> {
    const db = (await this._connection).db('todo-lists')
    return callback(db)
  }
}
