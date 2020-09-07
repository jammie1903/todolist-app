import { ITodoListDataStore } from './ITodoListDataStore'
import { TodoList } from './TodoList'
import persistance from '../persistance'

export default class LocalTodoListDataStore implements ITodoListDataStore {
  private _data: Omit<TodoList, 'items'>[] = []
  private _idCount = 0

  async getAll(): Promise<TodoList[]> {
    const load = this._data.map(async i => ({...i, items: await persistance.todoItems.getAll(i.id)}))
    return Promise.all(load)
  }

  async get(id: string): Promise<TodoList | null> {
    const match = this._data.find(i => i.id === id)
    return match ? {...match, items: await persistance.todoItems.getAll(id)} : null
  }

  async create(text: string): Promise<TodoList> {
    const id = (++this._idCount).toString()
    const newItem = {id, text: text.trim()}
    this._data.push(newItem)
    return {...newItem, items: []}
  }

  async update(id: string, values: Partial<Omit<TodoList, 'id'>>): Promise<Omit<TodoList, 'items'> | null> {
    const match = this._data.find(i => i.id === id)
    if(match) {
      match.text = values.text && values.text.trim() ? values.text : match.text 
      return {...match}
    }
    return null
  }

  async delete(id: string): Promise<boolean> {
    const match = this._data.findIndex(i => i.id === id)
    if(match !== -1) {
      this._data.splice(match, 1)
      persistance.todoItems.deleteByParent(id)
      return true
    }
    return false
  }
}
