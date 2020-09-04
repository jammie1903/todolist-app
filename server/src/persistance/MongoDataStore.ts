import { MongoClient, MongoError, Db, WithId } from 'mongodb'

import { IDataStore } from './IDataStore'
import { TodoItem } from './TodoItem'

type PersistedTodoItem = WithId<Omit<TodoItem, 'id'>>

function sanitise(item: null): null
function sanitise(item: PersistedTodoItem): TodoItem
function sanitise(item: PersistedTodoItem | null): TodoItem | null

function sanitise(item: PersistedTodoItem | null): TodoItem | null {
  return item ? {...item, id: item._id.toString()} : null
}

export default class MongoDataStore implements IDataStore {
  private _connection: Promise<MongoClient>

  constructor(url: string) {
    this._connection = MongoClient.connect(url)
  }

  private async withDatabase<T>(callback: (db: Db) => T | Promise<T>): Promise<T> {
    const db = (await this._connection).db('todo-lists')
    return callback(db)
  }

  getAll(): Promise<TodoItem[]> {
    return this.withDatabase(async db => {
      const allItems = db.collection<PersistedTodoItem>('todo-items').find()
      return (await allItems.toArray()).map(sanitise) as TodoItem[]
    })
  }

  get(id: string): Promise<TodoItem | null> {
    return this.withDatabase(async db => {
      const result = await db.collection<PersistedTodoItem>('todo-items').findOne({id})
      return sanitise(result)
    })
  }

  async create(text: string): Promise<TodoItem> {
    const newItem: Partial<TodoItem> = {text: text.trim(), state: false}
    return this.withDatabase(async db => {
      const result = await db.collection('todo-items').insertOne(newItem)
      newItem.id = result.insertedId.toString()
      return newItem as TodoItem
    })
  }

  update(id: string, values: Partial<Omit<TodoItem, '_id'>>): Promise<TodoItem | null> {
    return this.withDatabase(async (db) => {
      const update: Partial<Omit<TodoItem, 'id'>> = {}
      if(values.text && values.text.trim()) update.text = values.text
      if(typeof values.state === 'boolean') update.state = values.state

      const result: PersistedTodoItem = (await db.collection('todo-items').findOneAndUpdate({id}, update)).value
      return sanitise(result)
    })
  }

  delete(id: string): Promise<boolean> {
    return this.withDatabase(async (db) => {
      const result = await db.collection('todo-items').deleteOne({id})
      return !!result.deletedCount
    })
  }
}
