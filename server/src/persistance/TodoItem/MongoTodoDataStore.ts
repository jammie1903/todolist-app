import { WithId, ObjectId } from 'mongodb'

import { ITodoDataStore } from './ITodoDataStore'
import { TodoItem } from './TodoItem'
import BaseMongoDataStore, { sanitise, sanitiseArray, PersistedItem } from '../BaseMongoDataStore'

type PersistedTodoItem = PersistedItem<TodoItem>

export default class MongoTodoDataStore extends BaseMongoDataStore implements ITodoDataStore {
  getAll(listId: string): Promise<TodoItem[]> {
    return this.withDatabase(async db => {
      const allItems = db.collection('todo-items').find({listId: new ObjectId(listId)})
      return sanitiseArray(await allItems.toArray(), 'listId')
    })
  }

  get(id: string): Promise<TodoItem | null> {
    return this.withDatabase(async db => {
      const result = await db.collection<PersistedTodoItem>('todo-items').findOne({id})
      return sanitise(result, 'listId')
    })
  }

  async create(text: string, listId: string): Promise<TodoItem> {
    const newItem: Partial<TodoItem> = {text: text.trim(), state: false, listId: new ObjectId(listId)}
    return this.withDatabase(async db => {
      const result = await db.collection('todo-items').insertOne(newItem)
      newItem.id = result.insertedId.toString()
      newItem.listId = newItem.listId!.toString()
      return newItem as TodoItem
    })
  }

  update(id: string, values: Partial<Omit<TodoItem, 'id' | 'listId'>>): Promise<TodoItem | null> {
    return this.withDatabase(async (db) => {
      const update: Partial<Omit<TodoItem, 'id'>> = {}
      if(values.text && values.text.trim()) update.text = values.text
      if(typeof values.state === 'boolean') update.state = values.state

      const result: PersistedTodoItem = (await db.collection('todo-items').findOneAndUpdate({id}, update)).value
      return sanitise(result, 'listId')
    })
  }

  delete(id: string): Promise<boolean> {
    return this.withDatabase(async (db) => {
      const result = await db.collection('todo-items').deleteOne({id})
      return !!result.deletedCount
    })
  }

  deleteByParent(listId: string): Promise<boolean> {
    return this.withDatabase(async (db) => {
      const result = await db.collection('todo-items').deleteMany({listId: new ObjectId(listId)})
      return !!result.deletedCount
    })
  }
}
