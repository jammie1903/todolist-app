import { IDataStore } from './IDataStore'
import { TodoItem } from './TodoItem'

export default class LocalDataStore implements IDataStore {
  private _data: TodoItem[] = []
  private _idCount = 0

  async getAll(): Promise<TodoItem[]> {
    return this._data.map(i => ({...i}))
  }

  async get(id: string): Promise<TodoItem | null> {
    const match = this._data.find(i => i.id === id)
    return match ? {...match} : null
  }

  async create(text: string): Promise<TodoItem> {
    const id = (++this._idCount).toString()
    const newItem = {id, text: text.trim(), state: false}
    this._data.push({...newItem})
    return newItem
  }

  async update(id: string, values: Partial<Omit<TodoItem, 'id'>>): Promise<TodoItem | null> {
    const match = this._data.find(i => i.id === id)
    if(match) {
      match.text = values.text && values.text.trim() ? values.text : match.text 
      match.state = typeof values.state === 'boolean' ? values.state : match.state
      return {...match}
    }
    return null
  }

  async delete(id: string): Promise<boolean> {
    const match = this._data.findIndex(i => i.id === id)
    if(match !== -1) {
      this._data.splice(match, 1)
      return true
    }
    return false
  }
}
