import { TodoItem } from './TodoItem'

export interface ITodoDataStore {
  getAll(listId: string): Promise<TodoItem[]>
  get(id: string): Promise<TodoItem | null>
  create(text: string, listId: string): Promise<TodoItem>
  update(id: string, values: Partial<Omit<TodoItem, 'id' | 'parentId'>>): Promise<TodoItem | null>
  delete(id: string): Promise<boolean>
  deleteByParent(listId: string): Promise<boolean>
}
