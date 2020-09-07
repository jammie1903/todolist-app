import { TodoItem } from '../TodoItem/TodoItem'

export interface TodoList {
  id: string
  text: string
  items: TodoItem[]
}
