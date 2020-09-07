import { WithId } from 'mongodb'

import { ITodoListDataStore } from './ITodoListDataStore'
import { TodoList } from './TodoList'
import BaseMongoDataStore, { sanitise, sanitiseArray, PersistedItem } from '../BaseMongoDataStore'
import persistance from '../persistance'

type PersistedTodoList = PersistedItem<TodoList>

export default class MongoTodoListDataStore extends BaseMongoDataStore implements ITodoListDataStore {
  getAll(): Promise<TodoList[]> {
    return this.withDatabase(async db => {
      const allItems = db.collection<PersistedTodoList>('todo-lists').find()

      const childLoad = sanitiseArray(await allItems.toArray()).map(async i => {
        i.items = await persistance.todoItems.getAll(i.id)
        return i
      })
      return Promise.all(childLoad)
    })
  }

  get(id: string): Promise<TodoList | null> {
    return this.withDatabase(async db => {
      const result = await db.collection<PersistedTodoList>('todo-lists').findOne({id})
      const sanitised = sanitise(result)
      if(sanitised) sanitised.items = await persistance.todoItems.getAll(id)
      return sanitised
    })
  }

  async create(text: string): Promise<TodoList> {
    const newItem: Partial<TodoList> = {text: text.trim()}
    return this.withDatabase(async db => {
      const result = await db.collection('todo-lists').insertOne(newItem)
      newItem.id = result.insertedId.toString()
      newItem.items = []
      return newItem as TodoList
    })
  }

  update(id: string, values: Partial<Omit<TodoList, '_id'>>): Promise<TodoList | null> {
    return this.withDatabase(async (db) => {
      const update: Partial<Omit<TodoList, 'id'>> = {}
      if(values.text && values.text.trim()) update.text = values.text

      const result: PersistedTodoList = (await db.collection('todo-lists').findOneAndUpdate({id}, update)).value
      return sanitise(result)
    })
  }

  delete(id: string): Promise<boolean> {
    return this.withDatabase(async (db) => {
      const result = await db.collection('todo-lists').deleteOne({id})
      persistance.todoItems.deleteByParent(id)
      return !!result.deletedCount
    })
  }
}
