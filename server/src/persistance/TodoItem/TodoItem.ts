import { ObjectId } from 'mongodb'

export interface TodoItem {
  id: string
  listId: string | ObjectId
  text: string
  state: boolean
}
