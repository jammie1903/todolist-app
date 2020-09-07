import { TodoList } from './TodoList'

export interface ITodoListDataStore {
  getAll(): Promise<TodoList[]>
  get(id: string): Promise<TodoList | null>
  create(text: string): Promise<TodoList>
  update(id: string, values: Partial<Omit<TodoList, 'id'>>): Promise<Omit<TodoList, 'items'> | null>
  delete(id: string): Promise<boolean>
}
