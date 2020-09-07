import * as WebSocket from 'ws'
import { WebSocketHandler } from './WebSocketHandler'
import { isSignalMessage } from './webSocket'
import persistance from '../persistance'

export class TodoListSocket extends WebSocketHandler {
  onMessage(ws: WebSocket, message: any): void {
    if (isSignalMessage(message)) {
      try {
        switch (message.type) {
          case 'ADD_ITEM':
            this.handleAdd(message.text, message.listId)
            break
          case 'DELETE_ITEM':
            this.handleDelete(message.id)
            break
          case 'ADD_LIST':
            this.handleAddList(message.text)
            break
          case 'DELETE_LIST':
            this.handleDeleteList(message.id)
            break
          case 'SET_STATE':
            this.handleSetState(message.id, message.value)
            break
        }
      } catch(e) {
        this.sendError(ws, e.message)
      }
    }
  }

  async handleAdd(text: string, listId: string) {
    if(!text || !text.trim() || !listId || !listId.trim()) {
      throw new Error(`Both 'text' and 'listId' must be specified`)
    }
    const result = await persistance.todoItems.create(text, listId)
    this.broadcast({
      type: 'NEW_ITEM',
      value: result
    })
  }

  async handleAddList(text: string) {
    if(!text || !text.trim()) {
      throw new Error(`'text' must be specified`)
    }
    const result = await persistance.todoLists.create(text)
    this.broadcast({
      type: 'NEW_LIST',
      value: result
    })
  }

  async handleDelete(id: string) {
    if(!id || !id.trim()) {
      throw new Error(`'id' must be specified`)
    }
    const result = await persistance.todoItems.delete(id)
    if (result) {
      this.broadcast({
        type: 'ITEM_DELETED',
        id
      })
    }
  }

  async handleDeleteList(id: string) {
    if(!id || !id.trim()) {
      throw new Error(`'id' must be specified`)
    }
    const result = await persistance.todoLists.delete(id)
    if (result) {
      this.broadcast({
        type: 'LIST_DELETED',
        id
      })
    }
  }

  async handleSetState(id: string, value: boolean) {
    if(!id || !id.trim() || typeof value !== 'boolean') {
      throw new Error(`'id' and 'value' must be specified`)
    }
    const result = await persistance.todoItems.update(id, { state: value })
    this.broadcast({
      type: 'ITEM_UPDATED',
      value: result
    })
  }

  async onConnection(ws: WebSocket): Promise<void> {
    this.send(ws, {
      type: 'INIT',
      value: await persistance.todoLists.getAll()
    })
  }
}
