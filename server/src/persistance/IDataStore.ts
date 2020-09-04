import { TodoItem } from './TodoItem'

export interface IDataStore {
  getAll(): Promise<TodoItem[]>
  get(id: string): Promise<TodoItem | null>
  create(text: string): Promise<TodoItem>
  update(id: string, values: Partial<Omit<TodoItem, 'id'>>): Promise<TodoItem | null>
  delete(id: string): Promise<boolean>
}
